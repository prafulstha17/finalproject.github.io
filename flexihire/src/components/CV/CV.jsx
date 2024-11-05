import React from 'react';

function CV() {
  const [DetailsData, setDetailsData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: ""
  });

  const ExperienceDataform = {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    responsibilities: ""
  };

  const initialEducationData = {
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    isCurrent: false
  };
  const initialSkillsData = {
    name: "",
    proficiency: 0
  };

  const initialCertificationData = {
    title: "",
    dateIssued: "",
    issuingOrganization: ""
  };


  const [ExperienceData, setExperienceData] = React.useState(ExperienceDataform);
  const [showAddMoreExperience, setShowAddMoreExperience] = React.useState(false);
  const [EducationData, setEducationData] = React.useState(initialEducationData);
  const [showAddMoreEducation, setShowAddMoreEducation] = React.useState(false);
  const [SkillsData, setSkillsData] = React.useState(initialSkillsData);
  const [showAddMoreSkills, setShowAddMoreSkills] = React.useState(false);
  const [CertificationData, setCertificationData] = React.useState(initialCertificationData);
  const [showAddMoreCertification, setShowAddMoreCertification] = React.useState(false);
  const [cvGenerated, setCvGenerated] = React.useState(false); // State to track CV generation


  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setDetailsData({
      ...DetailsData,
      [name]: value
    });
  };


  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    const url = `https://localhost:7148/api/User`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: "apple1",
          name: DetailsData.name,
          email: DetailsData.email,
          phone: DetailsData.phone,
          address: DetailsData.address,
          dateOfBirth: new Date(DetailsData.dateOfBirth).toISOString()
        })
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

  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperienceData({
      ...ExperienceData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleCertificationChange = (e) => {
    const { name, value } = e.target;
    setCertificationData({
      ...CertificationData,
      [name]: value
    });
  };

  const handleEducationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEducationData({
      ...EducationData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setSkillsData({
      ...SkillsData,
      [name]: value
    });
  };
  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    setShowAddMoreExperience(true);
  };

  const handleAddMoreExperience = () => {
    setExperienceData(ExperienceDataform);
    setShowAddMoreExperience(false);
  };

  const handleEducationSubmit = (e) => {
    e.preventDefault();
    setShowAddMoreEducation(true);
  };

  const handleAddMoreEducation = () => {
    setEducationData(initialEducationData);
    setShowAddMoreEducation(false);
  };
  const handleSkillsSubmit = (e) => {
    e.preventDefault();
    setShowAddMoreSkills(true);
  };

  const handleAddMoreSkills = () => {
    setSkillsData(initialSkillsData);
    setShowAddMoreSkills(false);
  };

  const handleCertificationSubmit = (e) => {
    e.preventDefault();
    setShowAddMoreCertification(true);
  };

  const handleAddMoreCertification = () => {
    setCertificationData(initialCertificationData);
    setShowAddMoreCertification(false);
  };



  //generate CV
  const handleGenerateCV = async () => {
    const userId = "apple1"; // Replace with dynamic user ID if needed
    const url = `https://localhost:7148/api/UserCv/${userId}/generate-cv`;
  }

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         details: DetailsData,
  //         experience: ExperienceData,
  //         education: EducationData,
  //         skills: SkillData,
  //         certifications: CertificationData
  //       })
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       alert("CV generated successfully!");
  //     } else {
  //       alert("Failed to generate CV. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error generating CV:", error);
  //     alert("An error occurred while generating the CV.");
  //   }
  // };

   // Download CV
   const handleDownloadCV = async () => {
    const userId = "apple1"; // Replace with dynamic user ID if needed
    const url = `https://localhost:7148/api/UserCv/${userId}/download-cv`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf" // Expecting PDF response
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'CV.pdf'; // Specify the name of the downloaded file
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
       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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
              <h3 className="block text-sm font-medium text-gray-700">Email address</h3>
              <input
                type="email"
                name="email"
                value={DetailsData.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Phone number</h3>
              <input
                type="tel"
                name="phone"
                value={DetailsData.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Address</h3>
              <input
                type="text"
                name="address"
                value={DetailsData.address}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Date of Birth</h3>
              <input
                type="date"
                name="dateOfBirth"
                value={DetailsData.dateOfBirth}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Experience */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Employment Information</h2>
          <form onSubmit={handleExperienceSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Company</h3>
              <input type="text" name="company" value={ExperienceData.company} onChange={handleExperienceChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Position</h3>
              <input type="text" name="position" value={ExperienceData.position} onChange={handleExperienceChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Start Date</h3>
              <input type="date" name="startDate" value={ExperienceData.startDate} onChange={handleExperienceChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">End Date</h3>
              <input type="date" name="endDate" value={ExperienceData.endDate} onChange={handleExperienceChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" name="isCurrent" checked={ExperienceData.isCurrent} onChange={handleExperienceChange} className="mr-2" />
              <h3 className="block text-sm font-medium text-gray-700">Is Current</h3>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Responsibilities</h3>
              <textarea name="responsibilities" value={ExperienceData.responsibilities} onChange={handleExperienceChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            <div className="flex justify-end">
              <button type="button" className="bg-red-600 mr-4 ">Cancel</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </form>
          {showAddMoreExperience && (
            <div className="flex justify-end mt-4">
              <button onClick={handleAddMoreExperience} className="bg-blue-600 text-white px-4 py-2 rounded-md">Add More</button>
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Education Information</h2>
          <form onSubmit={handleEducationSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Institution</h3>
              <input type="text" name="institution" value={EducationData.institution} onChange={handleEducationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Degree</h3>
              <select name="degree" value={EducationData.degree} onChange={handleEducationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="">Select Degree</option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate Degree (Ph.D.)">Doctorate Degree (Ph.D.)</option>
                <option value="Professional Degree (e.g., MD, JD)">Professional Degree (e.g., MD, JD)</option>
                <option value="Technical Diploma/Certificate">Technical Diploma/Certificate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Start Date</h3>
              <input type="date" name="startDate" value={EducationData.startDate} onChange={handleEducationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">End Date</h3>
              <input type="date" name="endDate" value={EducationData.endDate} onChange={handleEducationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" name="isCurrent" checked={EducationData.isCurrent} onChange={handleEducationChange} className="mr-2" />
              <h3 className="block text-sm font-medium text-gray-700">Is Current</h3>
            </div>
            <div className="flex justify-end">
              <button type="button" className="mr-4 text-gray-700">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </form>
          {showAddMoreEducation && (
            <div className="flex justify-end mt-4">
              <button onClick={handleAddMoreEducation} className="bg-blue-600 text-white px-4 py-2 rounded-md">Add More</button>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Skills Information</h2>
          <form onSubmit={handleSkillsSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Name</h3>
              <input type="text" name="name" value={SkillsData.name} onChange={handleSkillsChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Proficiency</h3>
              <input type="range" name="proficiency" min="0" max="5" value={SkillsData.proficiency} onChange={handleSkillsChange} className="mt-1 block w-full" />
              <div className="flex justify-between text-xs text-gray-600">
                <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="mr-4 text-gray-700">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </form>
          {showAddMoreSkills && (
            <div className="flex justify-end mt-4">
              <button onClick={handleAddMoreSkills} className="bg-blue-600 text-white px-4 py-2 rounded-md">Add More</button>
            </div>
          )}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Certifications Information</h2>
          <form onSubmit={handleCertificationSubmit}>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Title</h3>
              <input type="text" name="title" value={CertificationData.title} onChange={handleCertificationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Date Issued</h3>
              <input type="date" name="dateIssued" value={CertificationData.dateIssued} onChange={handleCertificationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Issuing Organization</h3>
              <input type="text" name="issuingOrganization" value={CertificationData.issuingOrganization} onChange={handleCertificationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div className="flex justify-end">
              <button type="button" className="mr-4 text-gray-700">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </form>
          {showAddMoreCertification && (
            <div className="flex justify-end mt-4">
              <button onClick={handleAddMoreCertification} className="bg-blue-600 text-white px-4 py-2 rounded-md">Add More</button>
            </div>
          )}
        </div>
      </div>

      {/* Generate CV Button */}
      <div className="flex justify-end mt-6">
            <button onClick={handleGenerateCV} className="bg-green-600 text-white px-4 py-2 rounded-md">Generate CV</button>
          </div>

          
      {/* Download CV Button */}
      {cvGenerated && (
        <div className="flex justify-end mt-6">
          <button onClick={handleDownloadCV} className="bg-blue-600 text-white px-4 py-2 rounded-md">Download CV</button>
        </div>
      )}
    </>
  );
}

export default CV;
