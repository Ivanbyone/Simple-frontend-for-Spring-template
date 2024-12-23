import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState(
    new Map([
      ["category", ""],
      ["surname", ""],
      ["name", ""],
      ["age", ""],
      ["city", ""],
      ["email", ""],
      ["phoneNumber", ""],
      ["salary", ""],
      ["gitHubUrl", ""],
    ])
  );

  const [responseMessage, setResponseMessage] = useState("");
  const [responseData, setResponseData] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(
      new Map(formData.set(name, value))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = JSON.stringify(Object.fromEntries(formData));
    console.log(newFormData);

    try {
      const response = await fetch("http://localhost:8080/api/v1/feedback-form/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newFormData,
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message || "Форма успешно сохранена!");
        setResponseData(result.formUrl || null);
      } else {
        const error = await response.json();
        setResponseMessage(error.message || "Failed to submit form. Try again.");
        setResponseData(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred. Please try again.");
      setResponseData(null);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Форма обратной связи</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Позиция:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Фамилия:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Имя:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Возраст:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Город:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Телефон для связи:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Ожидаемая зарплата:
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Ссылка на GitHub:
            <input
              type="text"
              name="gitHubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p style={{ marginTop: "20px" }}>{responseMessage}</p>}
      {responseData && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h4>Ссылка для отслеживания:</h4>
          <a href={JSON.stringify(responseData, null, 2)} target="_blank" rel="noopener noreferrer">Ссылка</a>
        </div>
      )}
    </div>
  );
}

export default App;
