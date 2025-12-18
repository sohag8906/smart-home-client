import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const TodaySchedule = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchProjects = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `http://localhost:3000/projects/assigned/${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const todayStr = format(new Date(), "yyyy-MM-dd");
        const filtered = res.data.filter((project) => {
          const projectDate = format(parseISO(project.date), "yyyy-MM-dd");
          return projectDate === todayStr;
        });

        setProjects(filtered);
      } catch (err) {
        console.error("Error fetching today’s projects:", err.response?.data || err);
        setError(err.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;
  if (projects.length === 0) return <p className="text-center py-6">No projects assigned for today.</p>;

  return (
    <div className="p-4 space-y-6">
      
      <div className="bg-blue-100 rounded-xl p-6 shadow text-center">
        <h2 className="text-3xl font-bold text-blue-700">Today's Projects</h2>
        <p className="text-xl mt-2">{projects.length} Project{projects.length > 1 ? 's' : ''}</p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-xl p-4 shadow border">
            <h3 className="font-semibold text-lg">{project.serviceName}</h3>
            <p className="text-sm text-gray-500">Client: {project.customerEmail}</p>
            <p className="text-sm capitalize mt-1">Status: <span className="font-medium">{project.status}</span></p>
            <p className="text-sm text-gray-400 mt-1">Date: {format(parseISO(project.date), "dd MMM yyyy")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
