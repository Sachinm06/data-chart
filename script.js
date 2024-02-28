let data; 

fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; 
    populateDropdowns();
  })
  .catch(error => console.error('Error fetching data:', error));

function populateDropdowns() {
  const countrySelect = document.getElementById('countrySelect');
  const citySelect = document.getElementById('citySelect');
  data.countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.name;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });
  changeCities(); 
}

function changeCities() {
  const countrySelect = document.getElementById('countrySelect');
  const citySelect = document.getElementById('citySelect');
  const selectedCountry = countrySelect.value;
  const selectedCountryData = data.countries.find(country => country.name === selectedCountry);
  const cities = selectedCountryData ? selectedCountryData.cities : [];
  citySelect.innerHTML = ''; 
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.name;
    option.textContent = city.name;
    citySelect.appendChild(option);
  });
  showOptions(); 
}

  function showOptions() {
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.value;
    const selectedCountry = document.getElementById('countrySelect').value;
    const selectedCountryData = data.countries.find(country => country.name === selectedCountry);
    const selectedCityData = selectedCountryData ? selectedCountryData.cities.find(city => city.name === selectedCity) : null;
    const optionsDiv = document.getElementById('optionsDiv');
    const optionsList = document.getElementById('optionsList');
    const optionDataDiv = document.getElementById('optionData');
    if (selectedCityData) {
      optionsList.innerHTML = ''; 
      selectedCityData.options.forEach((option, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = option.name;
        listItem.addEventListener('click', () => {
          showOptionData(option.data);
          toggleClicked(listItem); 
        });
        optionsList.appendChild(listItem);
        if (index === 0) {
          showOptionData(option.data);
        }
      });
      optionsDiv.style.display = 'block';
    } else {
      optionsDiv.style.display = 'none'; 
    }
  
    const firstListItem = optionsList.querySelector('li');
    if (firstListItem) {
      toggleClicked(firstListItem);
    }
  }

  function toggleClicked(listItem) {
    const optionsList = document.getElementById('optionsList');
    optionsList.querySelectorAll('li').forEach(item => {
      item.classList.remove('clicked');
    });
  
    listItem.classList.toggle('clicked');
  }
function showOptionData(data) {
  const optionDataDiv = document.getElementById('optionData');
  optionDataDiv.textContent = JSON.stringify(data, null, 2);
}