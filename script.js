// 여행 계획 데이터
const travelData = {
    meals: {
        breakfast: [
            { name: "토스트 & 커피", restaurant: "카페 모닝글로리", price: "8,000원" },
            { name: "한식 백반", restaurant: "아침밥상", price: "9,000원" },
            { name: "샌드위치 세트", restaurant: "서브웨이", price: "7,500원" }
        ],
        lunch: [
            { name: "돈카츠 정식", restaurant: "히카츠", price: "12,000원" },
            { name: "된장찌개 백반", restaurant: "토속촌", price: "10,000원" },
            { name: "파스타", restaurant: "이탈리아노", price: "15,000원" }
        ],
        dinner: [
            { name: "삼겹살", restaurant: "숯불갈비", price: "15,000원" },
            { name: "해물찜", restaurant: "바다향", price: "40,000원" },
            { name: "한우 구이", restaurant: "한우마을", price: "35,000원" }
        ]
    },

    accommodations: [
        { name: "그랜드 호텔", type: "호텔", price: "120,000원", rating: "4.5", distance: "도착지에서 500m" },
        { name: "시티 비즈니스 호텔", type: "비즈니스 호텔", price: "80,000원", rating: "4.2", distance: "도착지에서 800m" },
        { name: "코지 게스트하우스", type: "게스트하우스", price: "45,000원", rating: "4.0", distance: "도착지에서 1.2km" },
        { name: "모던 에어비앤비", type: "민박", price: "60,000원", rating: "4.3", distance: "도착지에서 600m" },
        { name: "럭셔리 레지던스", type: "레지던스", price: "150,000원", rating: "4.7", distance: "도착지에서 300m" }
    ],

    attractions: {
        tourist: [
            { name: "중앙 박물관", description: "역사와 문화를 한눈에 볼 수 있는 대형 박물관", time: "2-3시간 소요" },
            { name: "전망대", description: "도시 전체를 조망할 수 있는 최고의 뷰포인트", time: "1시간 소요" },
            { name: "역사 공원", description: "산책과 휴식을 즐길 수 있는 아름다운 공원", time: "1-2시간 소요" }
        ],
        restaurants: [
            { name: "미슐랭 레스토랑", description: "현지 최고의 파인다이닝 레스토랑", specialty: "프렌치 퀴진" },
            { name: "전통 맛집", description: "3대째 이어온 전통 한식당", specialty: "불고기, 갈비찜" },
            { name: "해산물 시장 식당", description: "신선한 해산물을 맛볼 수 있는 현지인 맛집", specialty: "회, 조개구이" }
        ]
    }
};

// 교통수단별 이름 매핑
const transportNames = {
    public: "대중교통",
    car: "자동차",
    taxi: "택시",
    walk: "도보"
};

// 폼 제출 처리
document.getElementById('travelForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 입력값 가져오기
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const departureDate = document.getElementById('departureDate').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const transport = document.querySelector('input[name="transport"]:checked').value;

    // 날짜 유효성 검사
    if (new Date(departureDate) >= new Date(arrivalDate)) {
        alert('도착 일시는 출발 일시보다 늦어야 합니다.');
        return;
    }

    // 결과 섹션 표시
    document.getElementById('results').style.display = 'block';

    // 여행 경로 정보 표시
    displayRouteInfo(departure, arrival, departureDate, arrivalDate, transport);

    // 식사 추천 표시
    displayMealRecommendations();

    // 숙소 추천 표시 (밤 도착 시)
    displayAccommodations(arrivalDate);

    // 관광지 및 맛집 추천 표시
    displayAttractions();

    // 결과로 스크롤
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// 여행 경로 정보 표시
function displayRouteInfo(departure, arrival, departureDate, arrivalDate, transport) {
    const routeInfo = document.getElementById('routeInfo');

    const depDate = new Date(departureDate);
    const arrDate = new Date(arrivalDate);
    const duration = Math.round((arrDate - depDate) / (1000 * 60 * 60)); // 시간 단위

    routeInfo.innerHTML = `
        <div class="route-detail">
            <strong>출발지:</strong>
            <span>${departure}</span>
        </div>
        <div class="route-detail">
            <strong>도착지:</strong>
            <span>${arrival}</span>
        </div>
        <div class="route-detail">
            <strong>출발 시간:</strong>
            <span>${formatDateTime(depDate)}</span>
        </div>
        <div class="route-detail">
            <strong>도착 시간:</strong>
            <span>${formatDateTime(arrDate)}</span>
        </div>
        <div class="route-detail">
            <strong>소요 시간:</strong>
            <span>약 ${duration}시간</span>
        </div>
        <div class="route-detail">
            <strong>교통수단:</strong>
            <span>${transportNames[transport]}</span>
        </div>
    `;
}

// 식사 추천 표시
function displayMealRecommendations() {
    const mealDiv = document.getElementById('mealRecommendations');

    let html = '<div class="meal-grid">';

    // 아침 식사
    html += `
        <div class="meal-item">
            <h4>🌅 아침 식사</h4>
            <ul>
                ${travelData.meals.breakfast.map(meal =>
                    `<li><strong>${meal.name}</strong> - ${meal.restaurant} (${meal.price})</li>`
                ).join('')}
            </ul>
        </div>
    `;

    // 점심 식사
    html += `
        <div class="meal-item">
            <h4>☀️ 점심 식사</h4>
            <ul>
                ${travelData.meals.lunch.map(meal =>
                    `<li><strong>${meal.name}</strong> - ${meal.restaurant} (${meal.price})</li>`
                ).join('')}
            </ul>
        </div>
    `;

    // 저녁 식사
    html += `
        <div class="meal-item">
            <h4>🌙 저녁 식사</h4>
            <ul>
                ${travelData.meals.dinner.map(meal =>
                    `<li><strong>${meal.name}</strong> - ${meal.restaurant} (${meal.price})</li>`
                ).join('')}
            </ul>
        </div>
    `;

    html += '</div>';
    mealDiv.innerHTML = html;
}

// 숙소 추천 표시 (밤 도착 시)
function displayAccommodations(arrivalDate) {
    const arrDate = new Date(arrivalDate);
    const hour = arrDate.getHours();

    const accommodationSection = document.getElementById('accommodationSection');

    // 밤 시간 (18시 이후 또는 6시 이전)
    if (hour >= 18 || hour < 6) {
        accommodationSection.style.display = 'block';

        const accommodationList = document.getElementById('accommodationList');

        let html = `
            <table class="accommodation-table">
                <thead>
                    <tr>
                        <th>숙소명</th>
                        <th>유형</th>
                        <th>가격</th>
                        <th>평점</th>
                        <th>거리</th>
                    </tr>
                </thead>
                <tbody>
        `;

        travelData.accommodations.forEach(acc => {
            html += `
                <tr>
                    <td data-label="숙소명"><strong>${acc.name}</strong></td>
                    <td data-label="유형">${acc.type}</td>
                    <td data-label="가격">${acc.price}</td>
                    <td data-label="평점">⭐ ${acc.rating}</td>
                    <td data-label="거리">${acc.distance}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        accommodationList.innerHTML = html;
    } else {
        accommodationSection.style.display = 'none';
    }
}

// 관광지 및 맛집 추천 표시
function displayAttractions() {
    const attractionsDiv = document.getElementById('attractions');

    let html = '<div class="attraction-grid">';

    // 관광지
    travelData.attractions.tourist.forEach(place => {
        html += `
            <div class="attraction-item">
                <span class="attraction-type">관광지</span>
                <h4>${place.name}</h4>
                <p>${place.description}</p>
                <p><strong>⏱️ ${place.time}</strong></p>
            </div>
        `;
    });

    // 맛집
    travelData.attractions.restaurants.forEach(restaurant => {
        html += `
            <div class="attraction-item">
                <span class="attraction-type">맛집</span>
                <h4>${restaurant.name}</h4>
                <p>${restaurant.description}</p>
                <p><strong>🍽️ 특선: ${restaurant.specialty}</strong></p>
            </div>
        `;
    });

    html += '</div>';
    attractionsDiv.innerHTML = html;
}

// 날짜 포맷팅
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
}
