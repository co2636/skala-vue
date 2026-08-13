import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const cityMeta = [
  { id: 'city_01', name: '서울', query: 'Seoul' },
  { id: 'city_02', name: '수원', query: 'Suwon' },
  { id: 'city_03', name: '부산', query: 'Busan' },
  { id: 'city_04', name: '울산', query: 'Ulsan' },
  { id: 'city_05', name: '김해', query: 'Gimhae' },
  { id: 'city_06', name: '포항', query: 'Pohang' },
  { id: 'city_07', name: '제주도', query: 'Jeju' },
  { id: 'city_08', name: '대구', query: 'Daegu' },
]

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref([])
  const forecastList = ref([])
  const forecastError = ref('')
  const isLoading = ref(false)
  const errorMessage = ref('')

  const getCityById = (cityId) => {
    return weatherList.value.find((item) => item.id === cityId)
  }

  const fetchWeather = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const result = []

      for (const city of cityMeta) {
        const res = await axios.get(`${BASE_URL}/weather`, {
          params: {
            q: city.query,
            appid: API_KEY,
            units: 'metric',
            lang: 'kr',
          },
        })

        const airRes = await axios.get(`${BASE_URL}/air_pollution`, {
          params: {
            lat: res.data.coord.lat,
            lon: res.data.coord.lon,
            appid: API_KEY,
          },
        })

        const aqiLabel = ['', '매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']
        const dustLevel = aqiLabel[airRes.data.list?.[0]?.main?.aqi] ?? '정보 없음'

        const { main, weather, wind, coord } = res.data
        const { query: _query, ...cityInfo } = city

        result.push({
          ...cityInfo,
          temp: Math.round(main?.temp ?? 0),
          status: weather?.[0]?.description ?? '정보 없음',
          humidity: main?.humidity ?? 0,
          wind: wind?.speed ?? 0,
          lat: coord?.lat,
          lon: coord?.lon,
          dust: dustLevel,
        })
      }

      weatherList.value = result
    } catch (e) {
      errorMessage.value = '날씨 정보를 불러오지 못했습니다.'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const fetchForecast = async (lat, lon) => {
    forecastError.value = ''
    try {
      const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: 'temperature_2m,precipitation,precipitation_probability',
          forecast_days: 2,
          timezone: 'Asia/Seoul',
        },
      })

      const hourly = res.data.hourly
      const startIndex = dayjs().hour()
      const list = []

      for (let i = startIndex; i < startIndex + 12; i++) {
        list.push({
          hour: dayjs(hourly.time?.[i]).format('HH'),
          temp: Math.round(hourly.temperature_2m?.[i] ?? 0),
          rainMm: hourly.precipitation?.[i] ?? 0,
          rainProb: hourly.precipitation_probability?.[i] ?? 0,
        })
      }

      forecastList.value = list
    } catch (e) {
      console.error(e)
      forecastList.value = []
      forecastError.value =
        e.response?.status === 429
          ? '예보 조회 요청이 많아 잠시 후 다시 시도해 주세요.'
          : '예보 정보를 불러오지 못했습니다.'
    }
  }

  return {
    weatherList,
    forecastList,
    forecastError,
    isLoading,
    errorMessage,
    getCityById,
    fetchWeather,
    fetchForecast,
  }
})
