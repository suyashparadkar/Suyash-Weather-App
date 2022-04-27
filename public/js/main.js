const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    // alert('hii');
    let cityVal = cityName.value;
    if(cityVal === '')
    {
        city_name.innerHTML = `Please enter your city name before search`;
        datahide.classList.add('data_hide');
    }
    else
    {
        try
        {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=2f1b56263fd1a6cbb95c97e22de62872`;
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const arrData = [data];
            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            // temp_status.innerHTML = arrData[0].weather[0].main;
            const tempStatus = arrData[0].weather[0].main;
            if(tempStatus == "Clear" || tempStatus == 'Sunny')
            {
                temp_status.innerHTML = '<i class="fa-solid fa-sun" style="color: #eccc68"></i>';
            }
            else if(tempStatus == 'Clouds')
            {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud" style="color: #f1f2f6"></i>';
            }
            else if(tempStatus == 'Rainy' || tempStatus == 'Rain')
            {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud-rain" style="color: #f1f2f6"></i>';
            }
            else
            {
                temp_status.innerHTML = '<i class="fa-solid fa-sun" style="color: #eccc68"></i>';
            }
            datahide.classList.remove('data_hide');
        }
        catch
        {
            city_name.innerHTML = `Please enter correct city name`;
            datahide.classList.add('data_hide');
        }
    }
};

submitBtn.addEventListener('click', getInfo);
