const apiKey = 'ecc03de8ae103e67746f90bea52ea268'; // Ensure to keep this secure
const button = document.getElementById('generate');

button.addEventListener('click', async () => {
  const inputVal = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  const data = await getWeatherData(inputVal);
  if (data) {
    const { temp } = data.main;
    const date = new Date().toLocaleDateString();
    await postData('/add', { date, temp, feelings });

    //to Update UI
    const request = await fetch('/all');
    try {
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp + ' degrees';
      document.getElementById('content').innerHTML = allData.feelings;
    } catch (error) {
      console.log("Error updating UI", error);
    }
    }
});

const getWeatherData = async (zip) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error getting weather data", error);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Error posting data", error);
  }
};
