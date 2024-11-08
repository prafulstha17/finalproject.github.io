import React from "react";
import { auth } from "../../config/firebase";

function CV() {
  const [DetailsData, setDetailsData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  const ExperienceDataform = {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    responsibilities: "",
  };

  const initialEducationData = {
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  };
  const initialSkillsData = {
    name: "",
    proficiency: 0,
  };

  const initialCertificationData = {
    title: "",
    dateIssued: "",
    issuingOrganization: "",
  };

  const [user, setUser] = React.useState(null); //user information
  const [ExperienceData, setExperienceData] =
    React.useState(ExperienceDataform);
  const [showAddMoreExperience, setShowAddMoreExperience] =
    React.useState(false);
  const [EducationData, setEducationData] =
    React.useState(initialEducationData);
  const [showAddMoreEducation, setShowAddMoreEducation] = React.useState(false);
  const [SkillsData, setSkillsData] = React.useState(initialSkillsData);
  const [showAddMoreSkills, setShowAddMoreSkills] = React.useState(false);
  const [CertificationData, setCertificationData] = React.useState(
    initialCertificationData
  );
  const [showAddMoreCertification, setShowAddMoreCertification] =
    React.useState(false);
  const [cvGenerated, setCvGenerated] = React.useState(false); // State to track CV generation
  const [skillsList, setSkillsList] = React.useState([]); // State for fetched skills
  const [loading, setLoading] = React.useState(false); // Loading state

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    const fetchSkillsData = async () => {
      setLoading(true);
      const url = "https://localhost:7148/api/Skill";

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch skills");

        const result = await response.json();
        setSkillsList(result.data.$values); // Assuming the skills are inside result.data.$values
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  React.useEffect(() => {
    async function fetchPersonalInformation() {
      const url = `https://localhost:7148/api/User/${user?.uid}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch certification");
      const responseData = await response.json();
      const personalInfo = responseData?.data;
      console.log(personalInfo);

      setDetailsData({
        address: personalInfo?.address,
        email: personalInfo?.email,
        dateOfBirth: new Date(personalInfo?.dateOfBirth)
          .toISOString()
          .split("T")[0],
        name: personalInfo?.name,
        phone: personalInfo?.phone,
      });

      let experienceData = personalInfo?.experiences?.$values[0];
      const e_startDate = new Date(experienceData.startDate)
        .toISOString()
        .split("T")[0];
      const e_endDate = new Date(experienceData.endDate)
        .toISOString()
        .split("T")[0];

      setExperienceData({
        ...experienceData,
        startDate: e_startDate,
        endDate: e_endDate,
      });

      let educationData = personalInfo?.education?.$values[0];
      const ed_startDate = new Date(educationData.startDate)
        .toISOString()
        .split("T")[0];
      const ed_endDate = new Date(educationData.endDate)
        .toISOString(educationData.endDate)
        .split("T")[0];

      setEducationData({
        ...educationData,
        startDate: ed_startDate,
        endDate: ed_endDate,
      });

      let skillData = personalInfo?.skills?.$values[0];
      setSkillsData({ ...skillData });

      let certificateData = personalInfo?.certifications?.$values[0];
      const dateIssued = new Date(certificateData?.dateIssued)
        .toISOString()
        .split("T")[0];
      setCertificationData({ ...certificateData, dateIssued });
    }

    if (user != null) {
      fetchPersonalInformation();
    }
  }, [user]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setDetailsData({
      ...DetailsData,
      [name]: value,
    });
  };

  // personal information Submit
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    const url = `https://localhost:7148/api/User`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.uid,
          name: DetailsData.name,
          email: DetailsData.email,
          phone: DetailsData.phone,
          address: DetailsData.address,
          dateOfBirth: new Date(DetailsData.dateOfBirth).toISOString(),
        }),
      });

      if (response.ok) {
        alert("Personal Information saved successfully!");
      } else {
        alert("Failed to save Personal Information. Please try again.");
      }
    } catch (error) {
      console.error("Error saving Personal Information:", error);
      alert("An error occurred while saving Personal Information.");
    }
  };

  // handlePersonalInfoUpdate
  const handlePersonalInfoUpdate = async (e) => {
    e.preventDefault();

    const url = `https://localhost:7148/api/User/${user?.uid}`; // Assuming the API expects the user ID in the URL for updates

    try {
      const response = await fetch(url, {
        method: "PUT", // Use PUT for updates

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: user?.uid,

          name: DetailsData.name,

          email: DetailsData.email,

          phone: DetailsData.phone,

          address: DetailsData.address,

          dateOfBirth: new Date(DetailsData.dateOfBirth).toISOString(),
        }),
      });

      if (response.ok) {
        alert("Personal Information updated successfully!");

        // Optionally, you might want to fetch the updated information again
      } else {
        alert("Failed to update Personal Information. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Personal Information:", error);

      alert("An error occurred while updating Personal Information.");
    }
  };
  // handle employment information
  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    const url = `https://localhost:7148/api/Experience`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          company: ExperienceData.company,
          position: ExperienceData.position,
          startDate: new Date(ExperienceData.startDate).toISOString(),
          endDate: new Date(ExperienceData.endDate).toISOString(),
          isCurrent: ExperienceData.isCurrent,
          responsibilities: ExperienceData.responsibilities,
        }),
      });

      if (response.ok) {
        alert("Experience data saved successfully!");
      } else {
        alert("Failed to save Experience. Please try again.");
      }
    } catch (error) {
      console.error("Error saving Experience:", error);
      alert("An error occurred while saving Experience.");
    }
  };

  // handle employment information
  const handleEducationSubmit = async (e) => {
    e.preventDefault();
    const url = `https://localhost:7148/api/Education`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          startDate: new Date(EducationData.startDate).toISOString(),
          endDate: new Date(EducationData.endDate).toISOString(),
          degree: EducationData.degree,
          isCurrent: EducationData.isCurrent,
          institution: EducationData.institution,
        }),
      });

      if (response.ok) {
        alert("Education Inforamtoion saved successfully!");
      } else {
        alert("Failed to save Education Information. Please try again.");
      }
    } catch (error) {
      console.error("Error saving Education Information:", error);
      alert("An error occurred while saving Education Information.");
    }
  };

  // handle skill information
  const handleSkillsSubmit = async (e) => {
    e.preventDefault();
    const url = `https://localhost:7148/api/Skill`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          name: SkillsData.name,
          proficiency: SkillsData.proficiency,
        }),
      });

      if (response.ok) {
        alert("Skill saved successfully!");
      } else {
        alert("Failed to save Skill. Please try again.");
      }
    } catch (error) {
      console.error("Error saving Skill:", error);
      alert("An error occurred while saving Skill.");
    }
  };

  // certificate Information
  const handleCertificationSubmit = async (e) => {
    e.preventDefault();
    const url = `https://localhost:7148/api/Certification`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          title: CertificationData.title,
          dateIssued: new Date(EducationData.endDate).toISOString(),
          issuingOrganization: CertificationData.issuingOrganization,
        }),
      });

      if (response.ok) {
        alert("Certification Information saved successfully!");
      } else {
        alert("Failed to save Certification Information. Please try again.");
      }
    } catch (error) {
      console.error("Error saving Skill:", error);
      alert("An error occurred while saving Skill.");
    }
  };

  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperienceData({
      ...ExperienceData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleCertificationChange = (e) => {
    const { name, value } = e.target;
    setCertificationData({
      ...CertificationData,
      [name]: value,
    });
  };

  const handleEducationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEducationData({
      ...EducationData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setSkillsData({
      ...SkillsData,
      [name]: value,
    });
  };

  const handleAddMoreExperience = () => {
    setExperienceData(ExperienceDataform);
    setShowAddMoreExperience(false);
  };

  const handleAddMoreEducation = () => {
    setEducationData(initialEducationData);
    setShowAddMoreEducation(false);
  };

  const handleAddMoreSkills = () => {
    setSkillsData(initialSkillsData);
    setShowAddMoreSkills(false);
  };

  const handleAddMoreCertification = () => {
    setCertificationData(initialCertificationData);
    setShowAddMoreCertification(false);
  };

  //generate CV
  const handleGenerateCV = async () => {
    const userId = user?.uid; // Replace with dynamic user ID if needed
    const url = `https://localhost:7148/api/UserCv/${userId}/generate-cv`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const res = await response.json();
        if (res) {
          alert(res?.message);
          setCvGenerated(true);
        } else {
          alert("Error in response object. Please try again.");
        }
      } else {
        alert("Failed to generate CV. Please try again.");
      }
    } catch (error) {
      console.error("Error generating CV:", error);
      alert("An error occurred while generating the CV.");
    }
  };

  // Download CV
  const handleDownloadCV = async () => {
    const userId = user?.uid; // Replace with dynamic user ID if needed
    const url = `https://localhost:7148/api/UserCv/${userId}/download-cv`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf", // Expecting PDF response
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "CV.pdf"; // Specify the name of the downloaded file
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert("CV downloaded successfully!");
      } else {
        alert("Failed to download CV. Please try again.");
      }
    } catch (error) {
      console.error("Error downloading CV:", error);
      alert("An error occurred while downloading the CV.");
    }
  };

  return (
    <>
      {/* Personal Details */}
      {/* Personal Details */}
      <div className="pt-10 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <form onSubmit={handlePersonalInfoSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Name</h3>
              <input
                type="text"
                name="name"
                value={DetailsData.name}
                onChange={handlePersonalInfoChange}
                placeholder="Enter Your Name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Email address
              </h3>
              <input
                type="email"
                name="email"
                value={DetailsData.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Phone number
              </h3>
              <input
                type="tel"
                name="phone"
                value={DetailsData.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Address
              </h3>
              <input
                type="text"
                name="address"
                value={DetailsData.address}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Date of Birth
              </h3>
              <input
                type="date"
                name="dateOfBirth"
                value={DetailsData.dateOfBirth}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={handlePersonalInfoUpdate}
                className="bg-yellow-600 text-white px-4 py-2 ml-3 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Experience */}
      <div className="pt-10 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <form onSubmit={handleExperienceSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Company
              </h3>
              <input
                type="text"
                name="company"
                value={ExperienceData.company}
                onChange={handleExperienceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Position
              </h3>
              <input
                type="text"
                name="position"
                value={ExperienceData.position}
                onChange={handleExperienceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Start Date
              </h3>
              <input
                type="date"
                name="startDate"
                value={ExperienceData.startDate}
                onChange={handleExperienceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                End Date
              </h3>
              <input
                type="date"
                name="endDate"
                value={ExperienceData.endDate}
                onChange={handleExperienceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 flex items-center w-fit">
              <input
                type="checkbox"
                name="isCurrent"
                checked={ExperienceData.isCurrent}
                onChange={handleExperienceChange}
                className="mr-2"
              />
              <span className="text-xs font-medium text-gray-700">
                Is Current
              </span>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Responsibilities
              </h3>
              <textarea
                name="responsibilities"
                value={ExperienceData.responsibilities}
                onChange={handleExperienceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button type="button" className="bg-red-600 mr-4 ">
                Reset
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
          {showAddMoreExperience && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddMoreExperience}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add More
              </button>
            </div>
          )}

          <ul class="max-w-2xl mx-auto mt-20 divide-y  shadow shadow-blue-600 rounded-xl">
            <li>
              <details class="group">
                <summary class="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    class="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <span className="font-bold uppercase">
                    {ExperienceData.company}
                  </span>
                </summary>

                <article class="px-4 pb-4">
                  <p className="font-bold">
                    Position:{" "}
                    <span className="font-light">
                      {ExperienceData.position}
                    </span>{" "}
                  </p>
                  <p className="font-bold">
                    Responsibilities:{" "}
                    <span className="font-light">
                      {ExperienceData.responsibilities}
                    </span>
                  </p>
                  <p className="font-bold">
                    StartDate:{" "}
                    <span className="font-light">
                      {" "}
                      {ExperienceData.startDate}
                    </span>
                  </p>
                  <p className="font-bold">
                    EndDate:{" "}
                    <span className="font-light">{ExperienceData.endDate}</span>{" "}
                  </p>
                  <div className="flex justify-end">
                    <button type="button" className="bg-red-600 mr-4 ">
                      delete
                    </button>
                  </div>
                </article>
              </details>
            </li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="pt-10 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Education Information</h2>
          <form onSubmit={handleEducationSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Institution
              </h3>
              <input
                type="text"
                name="institution"
                value={EducationData.institution}
                onChange={handleEducationChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Degree
              </h3>
              <select
                name="degree"
                value={EducationData.degree}
                onChange={handleEducationChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Degree</option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate Degree (Ph.D.)">
                  Doctorate Degree (Ph.D.)
                </option>
                <option value="Professional Degree (e.g., MD, JD)">
                  Professional Degree (e.g., MD, JD)
                </option>
                <option value="Technical Diploma/Certificate">
                  Technical Diploma/Certificate
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Start Date
              </h3>
              <input
                type="date"
                name="startDate"
                value={EducationData.startDate}
                onChange={handleEducationChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                End Date
              </h3>
              <input
                type="date"
                name="endDate"
                value={EducationData.endDate}
                onChange={handleEducationChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 flex items-center w-fit">
              <input
                type="checkbox"
                name="isCurrent"
                checked={EducationData.isCurrent}
                onChange={handleEducationChange}
                className="mr-2"
              />
              <span className="text-xs font-medium text-gray-700">
                Is Current
              </span>
            </div>
            <div className="flex justify-end">
              <button type="button" className="bg-red-600 mr-4 ">
                Reset
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
          {showAddMoreEducation && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddMoreEducation}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="pt-10 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Skills Information</h2>
          <form onSubmit={handleSkillsSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Name</h3>
              <input
                type="text"
                name="name"
                value={SkillsData.name}
                onChange={handleSkillsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Proficiency
              </h3>
              <input
                type="range"
                name="proficiency"
                min="0"
                max="5"
                value={SkillsData.proficiency}
                onChange={handleSkillsChange}
                className="mt-1 block w-full"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="bg-red-600 mr-4 ">
                Reset
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
          {showAddMoreSkills && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddMoreSkills}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="py-10 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">
            Certifications Information
          </h2>
          <form onSubmit={handleCertificationSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Title</h3>
              <input
                type="text"
                name="title"
                value={CertificationData.title}
                onChange={handleCertificationChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Date Issued
              </h3>
              <input
                type="date"
                name="dateIssued"
                value={CertificationData.dateIssued}
                onChange={handleCertificationChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Issuing Organization
              </h3>
              <input
                type="text"
                name="issuingOrganization"
                value={CertificationData.issuingOrganization}
                onChange={handleCertificationChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" className="bg-red-600 mr-4 ">
                Reset
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
          {showAddMoreCertification && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddMoreCertification}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Generate CV Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleGenerateCV}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Generate CV
        </button>
      </div>

      {/* Download CV Button */}
      {cvGenerated && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleDownloadCV}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Download CV
          </button>
        </div>
      )}
    </>
  );
}

export default CV;
