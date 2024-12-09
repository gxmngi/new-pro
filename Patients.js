"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function RetreivePatients({ patient, index, onEdit, onDelete }) {
    const rights = [patient.Patient_Rights_1, patient.Patient_Rights_2, patient.Patient_Rights_3].filter(Boolean);
    const no = index + 1;

    return (
        <tr>
            <td className="py-2 px-4">{no}</td>
            <td className="py-2 px-4">{patient.HN}</td>
            <td className="py-2 px-4">{patient.Name}</td>
            <td className="py-2 px-4">
                {rights.map((right, i) => (
                    <span key={i} className="me-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {right}
                    </span>
                ))}
            </td>
            <td className="py-2 px-4">{patient.Chronic_Disease}</td>
            <td className="py-2 px-4">{patient.Address}</td>
            <td className="py-2 px-4">{patient.Phone}</td>
            <td className="py-2 px-4">
                <button onClick={() => onEdit(patient)} className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={() => onDelete(patient)} className="text-red-500 hover:text-red-700 ml-2">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Fetch patients (all or filtered by search)
    useEffect(() => {
        const fetchPatients = async () => {
            const url = search.trim() === "" 
                ? "http://localhost:3001/patients" 
                : `http://localhost:3001/patients/search/${search}`;
            const response = await fetch(url, {
                method: search.trim() === "" ? "GET" : "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setPatients(data);
            setLoading(false);
        };

        fetchPatients().catch(err => console.error(err));
    }, [search]);

    // Create Modal Handlers
    const handleCreateClick = () => {
        setSelectedPatient({
            HN: "",
            Name: "",
            Chronic_Disease: "",
            Patient_Rights_1: "",
            Patient_Rights_2: "",
            Patient_Rights_3: "",
            Address: "",
            Phone: "",
        });
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/patients/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedPatient),
        })
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => setPatients(data))
            .catch(err => console.error(err));
        setIsCreateModalOpen(false);
    };

    // Edit, Delete, and Other Modal Handlers are the same as previous...

    if (loading) {
        return <div className="container mx-auto px-4 pt-8 mt-8">Loading...</div>;
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 pt-8 mt-8 my-20 pb-20">
            <h1 className="text-3xl font-bold mb-4">Patients</h1>
            <div className="flex flex-row mb-4">
                <input
                    type="text"
                    className="w-96 border-2 border-blue-500 p-2 rounded-lg"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">Search</button>
                <button onClick={handleCreateClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
                    <FontAwesomeIcon icon={faPlus} /> Add Patient
                </button>
            </div>
            <table className="min-w-full bg-white table-auto border-b-4 border-blue-500 shadow-lg">
                <thead className="bg-blue-500 text-white text-left p-1">
                    <tr>
                        <th className="py-2 px-4 border-b">No</th>
                        <th className="py-2 px-4 border-b">HN</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Right</th>
                        <th className="py-2 px-4 border-b">Chronic Disease</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <RetreivePatients
                            key={index}
                            patient={patient}
                            index={index}
                            onEdit={(p) => console.log("Edit clicked", p)}
                            onDelete={(p) => console.log("Delete clicked", p)}
                        />
                    ))}
                </tbody>
            </table>

            {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Create Patient</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <input
                                type="text"
                                value={selectedPatient.Name}
                                onChange={(e) => setSelectedPatient({ ...selectedPatient, Name: e.target.value })}
                                className="border p-2 rounded w-full mb-4"
                                placeholder="Name"
                                required
                            />
                            <input
                                type="text"
                                value={selectedPatient.Phone}
                                onChange={(e) => setSelectedPatient({ ...selectedPatient, Phone: e.target.value })}
                                className="border p-2 rounded w-full mb-4"
                                placeholder="Phone"
                                required
                            />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                Save
                            </button>
                            <button type="button" onClick={handleCloseCreateModal} className="text-gray-500">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
