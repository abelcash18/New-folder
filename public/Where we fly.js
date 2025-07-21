 const destinations = [
            {
                id: 1,
                name: "Dubai",
                country: "UAE",
                region: "middle-east",
                image: "https://placehold.co/600x400",
                alt: "Dubai skyline with Burj Khalifa and modern architecture",
                description: "Our home hub with world-class attractions and luxury.",
                price: "Local",
                rating: 5,
                directFlights: true
            },
            {
                id: 2,
                name: "London",
                country: "UK",
                region: "europe",
                image: "https://placehold.co/600x400",
                alt: "London skyline with Big Ben and London Eye",
                description: "Historic landmarks meet modern culture.",
                price: "From AED 2,250",
                rating: 4,
                directFlights: true
            },
            {
                id: 3,
                name: "New York",
                country: "USA",
                region: "americas",
                image: "https://placehold.co/600x400",
                alt: "New York City skyline with Statue of Liberty",
                description: "The city that never sleeps.",
                price: "From AED 3,150",
                rating: 4,
                directFlights: true
            },
            {
                id: 4,
                name: "Sydney",
                country: "Australia",
                region: "asia",
                image: "https://placehold.co/600x400",
                alt: "Sydney Opera House and Harbour Bridge with blue water",
                description: "Stunning harbors and cosmopolitan charm.",
                price: "From AED 4,400",
                rating: 5,
                directFlights: true
            },
            {
                id: 5,
                name: "Cape Town",
                country: "South Africa",
                region: "africa",
                image: "https://placehold.co/600x400",
                alt: "Table Mountain overlooking Cape Town city and coastline",
                description: "Breathtaking landscapes and rich culture.",
                price: "From AED 2,900",
                rating: 4,
                directFlights: true
            },
            {
                id: 6,
                name: "Mumbai",
                country: "India",
                region: "asia",
                image: "https://placehold.co/600x400",
                alt: "Gateway of India monument with Arabian Sea in background",
                description: "Vibrant energy and Bollywood glamour.",
                price: "From AED 1,250",
                rating: 3,
                directFlights: true
            },
            {
                id: 7,
                name: "Paris",
                country: "France",
                region: "europe",
                image: "https://placehold.co/600x400",
                alt: "Eiffel Tower at sunset with pink sky",
                description: "Romance, art, and culinary excellence.",
                price: "From AED 2,400",
                rating: 5,
                directFlights: true
            },
            {
                id: 8,
                name: "Tokyo",
                country: "Japan",
                region: "asia",
                image: "https://placehold.co/600x400",
                alt: "Shibuya crossing with neon signs and bustling crowds",
                description: "Futuristic cities meet ancient traditions.",
                price: "From AED 3,650",
                rating: 5,
                directFlights: true
            },
            {
                id: 9,
                name: "Bangkok",
                country: "Thailand",
                region: "asia",
                image: "https://placehold.co/600x400",
                alt: "Grand Palace in Bangkok with golden spires",
                description: "Exotic temples and vibrant street life.",
                price: "From AED 1,650",
                rating: 4,
                directFlights: true
            }
        ];

        const destinationsGrid = document.getElementById('destinations-grid');
        const regionFilter = document.getElementById('region-filter');
        const sortBy = document.getElementById('sort-by');
        const mapViewTrigger = document.getElementById('map-view-trigger');
        let currentView = 'map';
        
        document.addEventListener('DOMContentLoaded', () => {
            renderDestinations(destinations);
            
          regionFilter.addEventListener('change', filterAndSortDestinations);
            sortBy.addEventListener('change', filterAndSortDestinations);
            mapViewTrigger.addEventListener('click', toggleMapView);
        });

       function renderDestinations(destinationsArray) {
            destinationsGrid.innerHTML = '';            
            destinationsArray.forEach(destination => {
                const card = document.createElement('div');
                card.className = 'destination-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer';
                card.innerHTML = `
                    <div class="relative">
                        <img src="${destination.image}" alt="${destination.alt}" class="w-full h-48 object-cover"/>
                        ${destination.directFlights ? 
                            `<div class="absolute top-2 right-2 bg-emirates-red text-white px-2 py-1 text-xs rounded-full">
                                Direct Flight
                            </div>` : ''}
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold">${destination.name}</h3>
                            <span class="text-emirates-red font-semibold">${destination.price}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">${destination.country}</p>
                        <p class="text-gray-700 mb-4">${destination.description}</p>
                        <div class="flex justify-between items-center">
                            <div class="flex">
                                ${Array(destination.rating).fill('<span class="text-yellow-400">★</span>').join('')}
                                ${Array(5 - destination.rating).fill('<span class="text-gray-300">★</span>').join('')}
                            </div>
                            <button class="text-emirates-red hover:text-red-800 font-semibold transition">Book Now</button>
                        </div>
                    </div>
                `;
                
               card.addEventListener('click', () => {
                    alert(`You selected ${destination.name}, ${destination.country}`);
                });
                
                destinationsGrid.appendChild(card);
            });
        }

       function filterAndSortDestinations() {
            const selectedRegion = regionFilter.value;
            const sortOption = sortBy.value;
            
            let filteredDestinations = [...destinations];
            
          if (selectedRegion !== 'all') {
                filteredDestinations = filteredDestinations.filter(
                    dest => dest.region === selectedRegion
                );
            }
            
           if (sortOption === 'name') {
                filteredDestinations.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'popularity') {
                filteredDestinations.sort((a, b) => b.rating - a.rating);
            }
            
            renderDestinations(filteredDestinations);
        }

         function toggleMapView() {
            if (currentView === 'map') {
                currentView = 'route';
                mapViewTrigger.textContent = 'Switch to Map View';
                document.querySelector('.map-container').innerHTML = `
                    <img src="https://placehold.co/1920x768" alt="Emirates global flight routes network visualization" class="w-full h-full object-cover" />
                `;
            } else {
                currentView = 'map';
                mapViewTrigger.textContent = 'Switch to Route View';
                document.querySelector('.map-container').innerHTML = `
                    <img src="https://placehold.co/1920x768" alt="World map with Emirates flight routes highlighted" class="w-full h-full object-cover" />
                `;
            }
        }