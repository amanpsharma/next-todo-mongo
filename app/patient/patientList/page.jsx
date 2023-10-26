"use client";
import { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function PatientList() {
  const [patients, setPatientList] = useState([]);
  const pageSize = 8; // Number of patients per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPatient = currentPage * pageSize;
  const indexOfFirstPatient = indexOfLastPatient - pageSize;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.ceil(patients.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const getPatient = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/patient`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to load todo");
      }
      const data = await res.json();
      console.log(data.patient);
      setPatientList(data.patient);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPatient();
  }, []);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DOB
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPatients.map((patient) => (
            <tr key={patient._id}>
              <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(patient.dob).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{patient.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{`${patient.address.street}, ${patient.address.city}, ${patient.address.state} ${patient.address.zip}`}</td>
              <td className="px-6 py-4 whitespace-nowrap">{patient.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  //   onClick={() => handleEdit(patient)}
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  <AiFillEdit size={24} />
                </button>
                <button
                  //   onClick={() => handleDelete(patient._id)}
                  className="ml-4 text-red-600 hover:underline focus:outline-none"
                >
                  <AiFillDelete size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 mx-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "hover:bg-blue-100 text-blue-500"
            }`}
          >
            Previous
          </button>
        </div>
        <div>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 mx-2 rounded-full hover:bg-blue-100 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 mx-2 rounded-full ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "hover:bg-blue-100 text-blue-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientList;
