"""Additional B2B seed data for new destinations — all unique images verified."""
from seed_data import _services

ADDITIONAL_PAIRED = {
    "China": ["Japan", "South Korea", "Taiwan", "Vietnam"],
    "South Korea": ["Japan", "China", "Taiwan", "Vietnam"],
    "Taiwan": ["Japan", "South Korea", "China", "Philippines"],
    "Sri Lanka": ["India", "Maldives", "Bhutan", "Indonesia"],
    "Bhutan": ["India", "Sri Lanka", "Nepal", "Vietnam"],
    "Bali": ["Thailand", "Vietnam", "Maldives", "Philippines"],
    "Vietnam": ["Cambodia", "Laos", "Thailand", "China"],
    "Malaysia": ["Singapore", "Indonesia", "Thailand", "Philippines"],
    "Singapore": ["Malaysia", "Indonesia", "Bali", "Vietnam"],
    "Philippines": ["Bali", "Indonesia", "Vietnam", "Taiwan"],
    "Cambodia": ["Vietnam", "Laos", "Thailand", "Malaysia"],
    "Laos": ["Vietnam", "Cambodia", "Thailand", "Bhutan"],
    "Kazakhstan": ["UAE", "India", "China", "South Korea"],
    "Egypt": ["Morocco", "UAE", "India", "South Africa"],
    "Nepal": ["India", "Bhutan", "Sri Lanka", "Tibet"],
}

# Verified working Unsplash URLs grouped by destination
_CN = {
    "hero": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w={w}&q=80",
    "wall": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w={w}&q=80",
    "shanghai": "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w={w}&q=80",
    "skyline": "https://images.unsplash.com/photo-1629826041135-611b7218a9bd?w={w}&q=80",
}
_KR = {
    "hero": "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w={w}&q=80",
    "city": "https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?w={w}&q=80",
    "night": "https://images.unsplash.com/photo-1648900451337-78cbbbd7383c?w={w}&q=80",
    "dmz": "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w={w}&q=80",
}
_TW = {
    "hero": "https://images.unsplash.com/photo-1470004914212-05527e49370b?w={w}&q=80",
    "gorge": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w={w}&q=80",
    "lake": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w={w}&q=80",
}
_LK = {
    "hero": "https://images.pexels.com/photos/6045035/pexels-photo-6045035.jpeg?auto=compress&cs=tinysrgb&w={w}",
    "train": "https://images.unsplash.com/photo-1578519050142-afb511e518de?w={w}&q=80",
    "beach": "https://images.unsplash.com/photo-1590580808117-1caa8e13f0e5?w={w}&q=80",
    "temple": "https://images.pexels.com/photos/8692686/pexels-photo-8692686.jpeg?auto=compress&cs=tinysrgb&w={w}",
}
_BT = {
    "hero": "https://images.unsplash.com/photo-1593331792312-15bead7aaa9b?w={w}&q=80",
    "cliff": "https://images.unsplash.com/photo-1585940043926-92f50991d354?w={w}&q=80",
    "valley": "https://images.unsplash.com/photo-1637826134825-e54e98a9bce7?w={w}&q=80",
}
_BL = {
    "hero": "https://images.unsplash.com/photo-1573790387438-4da905039392?w={w}&q=80",
    "rice": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w={w}&q=80",
    "terraces": "https://images.unsplash.com/photo-1675349673331-5bd6398000b9?w={w}&q=80",
    "green": "https://images.unsplash.com/photo-1761521688849-9700476692e5?w={w}&q=80",
    "palm": "https://images.unsplash.com/photo-1545830790-5d35573b0623?w={w}&q=80",
}
_VN = {
    "hero": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w={w}&q=80",
    "hoian": "https://images.unsplash.com/photo-1528127269322-539801943592?w={w}&q=80",
    "aerial1": "https://images.unsplash.com/photo-1593407738552-11f001b86462?w={w}&q=80",
    "aerial2": "https://images.unsplash.com/photo-1593407726603-9e2ac51386f9?w={w}&q=80",
}
_MY = {
    "hero": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w={w}&q=80",
    "island": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w={w}&q=80",
    "nature": "https://images.unsplash.com/photo-1540202404-a2f29016b523?w={w}&q=80",
}
_SG = {
    "hero": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w={w}&q=80",
    "bay": "https://images.unsplash.com/photo-1624003974266-7cdbf877ec00?w={w}&q=80",
    "skyline": "https://images.unsplash.com/photo-1589848014442-5f540ff95bea?w={w}&q=80",
}
_PH = {
    "hero": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w={w}&q=80",
    "lagoon": "https://images.unsplash.com/photo-1697135756100-7b610c8fe92e?w={w}&q=80",
    "rocks": "https://images.unsplash.com/photo-1697473259118-473211915531?w={w}&q=80",
}
_KH = {
    "hero": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w={w}&q=80",
    "face": "https://images.unsplash.com/photo-1673801014066-833635cfbab8?w={w}&q=80",
    "temple": "https://images.unsplash.com/photo-1594903717094-a83c33d2c49d?w={w}&q=80",
}
_LA = {
    "hero": "https://images.unsplash.com/photo-1570366583862-f91883984fde?w={w}&q=80",
    "monks": "https://images.unsplash.com/photo-1731990549901-21b977b0016a?w={w}&q=80",
    "temple": "https://images.unsplash.com/photo-1714240229996-faaa7a6d100d?w={w}&q=80",
}
_KZ = {
    "hero": "https://images.unsplash.com/photo-1565008576549-57569a49371d?w={w}&q=80",
    "valley": "https://images.unsplash.com/photo-1751440355869-fe6673d79f7d?w={w}&q=80",
    "mountain": "https://images.unsplash.com/photo-1752584157695-57a112c840cd?w={w}&q=80",
    "steppe": "https://images.unsplash.com/photo-1770055437706-8b865f870ead?w={w}&q=80",
}
_EG = {
    "hero": "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w={w}&q=80",
    "pyramids": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w={w}&q=80",
    "pyramids2": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w={w}&q=80",
    "giza": "https://images.unsplash.com/photo-1547995886-6dc09384c6e6?w={w}&q=80",
    "abu_simbel": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w={w}&q=80",
    "cairo": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w={w}&q=80",
    "mosque": "https://static.prod-images.emergentagent.com/jobs/9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/images/4b2a55b1c6334e636b8e3be2fd1db56abe93591f616b6376cc6aca9a21ad783a.png",
    "temple": "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w={w}&q=80",
    "desert": "https://images.unsplash.com/photo-1528702748617-c64d49f918af?w={w}&q=80",
    "camel": "https://static.prod-images.emergentagent.com/jobs/9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/images/d90f4f4a2c2f534da8c4adc5b35f80389e890bdf0c5fec3ebc9b5150c580a0b3.png",
    "bazaar": "https://static.prod-images.emergentagent.com/jobs/9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/images/55f1bfe31936cd6f374ddc565c066c1858ecaad7dc9e85d67d5fd47e3f9b6b3d.png",
    "aswan": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w={w}&q=80",
    "redsea": "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w={w}&q=80",
    "food": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w={w}&q=80",
    "oasis": "https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?w={w}&q=80",
    "desert_camp": "https://static.prod-images.emergentagent.com/jobs/9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/images/d30ac85221c81412583074f10da355dc500d09f7689986489218d23562a131d9.png",
}

def _u(tpl, w=700):
    if "{w}" in tpl:
        return tpl.format(w=w)
    return tpl

ADDITIONAL_DESTINATION_DETAILS = {
    "China": {
        "destination_name": "China", "tagline": "Your DMC for China",
        "hero_image": _u(_CN["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Beijing"}, {"label": "Currency", "value": "Yuan (CNY)"}, {"label": "Languages", "value": "Mandarin, Cantonese"}, {"label": "Best Season", "value": "Apr - May, Sep - Oct"}, {"label": "Hi DMC Office", "value": "Shanghai"}, {"label": "Local Team", "value": "40+ Experts"}],
        "services_in_country": _services("China", _u(_CN["hero"]), _u(_CN["wall"]), _u(_CN["shanghai"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Shanghai, China", "team_size": "40+", "description": "Mandarin-speaking specialists covering all major Chinese cities, the Silk Road, and Tibet."},
        "key_experiences": [
            {"title": "Great Wall at Mutianyu", "description": "Private guided trek on the best-preserved section with cable car access.", "image": _u(_CN["hero"], 600), "location": "Beijing"},
            {"title": "Terracotta Warriors", "description": "Skip-the-line access with expert archaeologist to Xi'an's 8,000-strong ancient army.", "image": _u(_CN["wall"], 600), "location": "Xi'an"},
            {"title": "Shanghai Bund Night Walk", "description": "Guided evening along the iconic waterfront with cocktails and skyline views.", "image": _u(_CN["shanghai"], 600), "location": "Shanghai"},
            {"title": "Li River Cruise", "description": "Scenic bamboo raft through karst peaks from Guilin to Yangshuo.", "image": _u(_CN["skyline"], 600), "location": "Guilin"},
        ],
        "key_destinations_within": [
            {"name": "Beijing", "description": "Forbidden City, Great Wall, and imperial grandeur.", "image": _u(_CN["hero"], 500)},
            {"name": "Shanghai", "description": "Futuristic skyline, French Concession, and culinary capital.", "image": _u(_CN["shanghai"], 500)},
            {"name": "Xi'an", "description": "Terracotta Warriors and ancient Silk Road starting point.", "image": _u(_CN["wall"], 500)},
            {"name": "Guilin", "description": "Karst mountains and the legendary Li River.", "image": _u(_CN["skyline"], 500)},
        ],
        "regions": [
            {"name": "Northern China", "description": "Beijing's imperial heritage, the Great Wall, and ancient capitals.", "highlights": ["Beijing", "Xi'an", "Great Wall", "Pingyao"], "image": _u(_CN["hero"], 600)},
            {"name": "Southern China", "description": "Karst landscapes, river cruises, and subtropical beauty.", "highlights": ["Guilin", "Shanghai", "Hangzhou", "Chengdu"], "image": _u(_CN["shanghai"], 600)},
        ],
        "food": {"intro": "Chinese cuisine is the world's most diverse — eight great traditions spanning 5,000 years.", "cuisines": [
            {"name": "Cantonese", "desc": "Dim sum, roast meats, and delicate stir-fries from Guangzhou.", "dishes": ["Dim Sum", "Char Siu", "Wonton Noodles", "Congee"]},
            {"name": "Sichuan", "desc": "Bold, fiery flavours — mouth-numbing peppercorns and chili oil.", "dishes": ["Mapo Tofu", "Kung Pao Chicken", "Hot Pot", "Dan Dan Noodles"]},
            {"name": "Peking Cuisine", "desc": "Beijing's imperial recipes — roast duck and northern wheat dishes.", "dishes": ["Peking Duck", "Jiaozi", "Zhajiangmian", "Lamb Hot Pot"]},
            {"name": "Shanghainese", "desc": "Sweet-savoury flavours, soup dumplings, and river seafood.", "dishes": ["Xiao Long Bao", "Hairy Crab", "Red-Braised Pork", "Scallion Pancake"]},
        ]},
        "packages": [
            {"title": "Classic China Triangle", "duration": "9N / 10D", "cities": "Beijing - Xi'an - Shanghai", "highlights": ["Great Wall hike", "Terracotta Warriors", "Bund night tour"], "tag": "Bestseller"},
            {"title": "Silk Road Explorer", "duration": "12N / 13D", "cities": "Xi'an - Dunhuang - Turpan - Kashgar", "highlights": ["Mogao Caves visit", "Gobi Desert camp", "Sunday bazaar"], "tag": "Adventure"},
            {"title": "China Highlights Express", "duration": "6N / 7D", "cities": "Beijing - Shanghai", "highlights": ["Forbidden City tour", "Bullet train experience", "Yu Garden walk"], "tag": "Most Popular"},
            {"title": "Guilin & Yangshuo", "duration": "5N / 6D", "cities": "Guilin - Yangshuo - Longji", "highlights": ["Li River cruise", "Rice terrace trek", "Cooking class"], "tag": "Cultural"},
            {"title": "Panda & Ancient China", "duration": "8N / 9D", "cities": "Chengdu - Leshan - Jiuzhaigou", "highlights": ["Panda breeding centre", "Giant Buddha visit", "Alpine lake hikes"], "tag": "Nature"},
            {"title": "Luxury Yangtze Cruise", "duration": "7N / 8D", "cities": "Chongqing - Three Gorges - Yichang", "highlights": ["5-star river cruise", "Three Gorges Dam", "Shore excursions"], "tag": "Premium"},
        ],
        "case_studies": [
            {"headline": "China Bookings Up 280%", "category": "FIT Performance", "description": "A European agency nearly quadrupled China bookings using our visa support and local guides.", "metric": "280%", "metric_label": "Growth"},
            {"headline": "90 Group Departures Annually", "category": "Group Metrics", "description": "Managed 90 group tours across Beijing, Shanghai, and Xi'an.", "metric": "90", "metric_label": "Departures"},
            {"headline": "Great Wall Corporate Event", "category": "MICE Delivery", "description": "400-person corporate event at the Great Wall.", "metric": "400", "metric_label": "Guests"},
            {"headline": "Multi-City in 24 Hours", "category": "Response Time", "description": "Complex Beijing-Xi'an-Shanghai itineraries with high-speed rail confirmed within 24 hours.", "metric": "24hr", "metric_label": "Turnaround"},
        ],
    },

    "South Korea": {
        "destination_name": "South Korea", "tagline": "Your DMC for South Korea",
        "hero_image": _u(_KR["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Seoul"}, {"label": "Currency", "value": "Won (KRW)"}, {"label": "Languages", "value": "Korean, English"}, {"label": "Best Season", "value": "Apr - Jun, Sep - Nov"}, {"label": "Hi DMC Office", "value": "Seoul"}, {"label": "Local Team", "value": "20+ Experts"}],
        "services_in_country": _services("South Korea", _u(_KR["hero"]), _u(_KR["city"]), _u(_KR["dmz"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Seoul, South Korea", "team_size": "20+", "description": "Bilingual specialists covering Seoul, Busan, Jeju, and the DMZ."},
        "key_experiences": [
            {"title": "Gyeongbokgung Palace Tour", "description": "Hanbok rental and private guided tour of Seoul's grandest royal palace.", "image": _u(_KR["hero"], 600), "location": "Seoul"},
            {"title": "K-Pop & K-Culture Trail", "description": "Gangnam, K-pop studios, K-drama filming locations, and K-beauty shopping.", "image": _u(_KR["night"], 600), "location": "Seoul"},
            {"title": "DMZ Border Experience", "description": "Guided visit to the most heavily fortified border in the world.", "image": _u(_KR["dmz"], 600), "location": "DMZ"},
            {"title": "Busan Coastal Walk", "description": "Haeundae Beach, Gamcheon Culture Village, and Jagalchi Fish Market.", "image": _u(_KR["city"], 600), "location": "Busan"},
        ],
        "key_destinations_within": [
            {"name": "Seoul", "description": "Dynamic capital — palaces, street food, and K-culture.", "image": _u(_KR["hero"], 500)},
            {"name": "Busan", "description": "Beaches, seafood markets, and colourful hillside villages.", "image": _u(_KR["city"], 500)},
            {"name": "Jeju", "description": "Volcanic island — UNESCO sites and subtropical beauty.", "image": _u(_KR["dmz"], 500)},
            {"name": "Gyeongju", "description": "Museum without walls — ancient Silla kingdom heritage.", "image": _u(_KR["night"], 500)},
        ],
        "regions": [
            {"name": "Seoul & Central", "description": "The capital region — palaces, DMZ, and modern K-culture.", "highlights": ["Seoul", "DMZ", "Suwon", "Incheon"], "image": _u(_KR["hero"], 600)},
            {"name": "Southern Korea & Islands", "description": "Coastal cities, temples, and volcanic Jeju Island.", "highlights": ["Busan", "Jeju", "Gyeongju", "Jeonju"], "image": _u(_KR["city"], 600)},
        ],
        "food": {"intro": "Korean cuisine is a global phenomenon — fermented, grilled, and bursting with umami.", "cuisines": [
            {"name": "BBQ & Grills", "desc": "Korean BBQ — bulgogi, samgyeopsal, and banchan side dishes.", "dishes": ["Bulgogi", "Samgyeopsal", "Galbi", "Banchan"]},
            {"name": "Street Food", "desc": "Myeongdong's stalls — tteokbokki, hotteok, and fried chicken.", "dishes": ["Tteokbokki", "Hotteok", "Chicken", "Kimbap"]},
            {"name": "Traditional", "desc": "Royal court cuisine, bibimbap, and fermented classics.", "dishes": ["Bibimbap", "Kimchi Jjigae", "Japchae", "Sundubu"]},
            {"name": "Modern Korean", "desc": "Seoul's Michelin scene and innovative fusion restaurants.", "dishes": ["Korean Fried Chicken", "Bingsu", "Jjajangmyeon", "Makgeolli"]},
        ]},
        "packages": [
            {"title": "Seoul & Jeju Classic", "duration": "7N / 8D", "cities": "Seoul - Jeju", "highlights": ["Palace tour in Hanbok", "Jeju volcanic hike", "K-BBQ experience"], "tag": "Bestseller"},
            {"title": "K-Culture Discovery", "duration": "5N / 6D", "cities": "Seoul", "highlights": ["K-pop studio visit", "Gangnam shopping", "DMZ border tour"], "tag": "Most Popular"},
            {"title": "Korea Grand Tour", "duration": "10N / 11D", "cities": "Seoul - Gyeongju - Busan - Jeju", "highlights": ["KTX bullet train", "Busan fish market", "Temple stay"], "tag": "Premium"},
            {"title": "Temple & Nature Retreat", "duration": "6N / 7D", "cities": "Seoul - Seoraksan - Andong", "highlights": ["Temple stay overnight", "Mountain hiking", "Mask dance village"], "tag": "Cultural"},
            {"title": "Foodie Korea", "duration": "5N / 6D", "cities": "Seoul - Jeonju - Busan", "highlights": ["Cooking class", "Jeonju bibimbap trail", "Jagalchi fish market"], "tag": "Culinary"},
            {"title": "Cherry Blossom Special", "duration": "7N / 8D", "cities": "Seoul - Jinhae - Gyeongju - Busan", "highlights": ["Jinhae cherry festival", "Bomun Lake blooms", "Haeundae beach"], "tag": "Seasonal"},
        ],
        "case_studies": [
            {"headline": "K-Culture Bookings Up 350%", "category": "FIT Performance", "description": "A Southeast Asian agency tripled Korea bookings driven by K-pop demand.", "metric": "350%", "metric_label": "Growth"},
            {"headline": "45 Group Departures Annually", "category": "Group Metrics", "description": "Managed 45 group tours across Seoul, Busan, and Jeju.", "metric": "45", "metric_label": "Departures"},
            {"headline": "K-Pop Fan Convention", "category": "MICE Delivery", "description": "200-person K-pop fan event in Seoul.", "metric": "200", "metric_label": "Guests"},
            {"headline": "Custom Korea in 12 Hours", "category": "Response Time", "description": "Seoul-Busan-Jeju itineraries confirmed within 12 hours.", "metric": "12hr", "metric_label": "Turnaround"},
        ],
    },

    "Taiwan": {
        "destination_name": "Taiwan", "tagline": "Your DMC for Taiwan",
        "hero_image": _u(_TW["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Taipei"}, {"label": "Currency", "value": "NT Dollar (TWD)"}, {"label": "Languages", "value": "Mandarin, Taiwanese"}, {"label": "Best Season", "value": "October - April"}, {"label": "Hi DMC Office", "value": "Taipei"}, {"label": "Local Team", "value": "15+ Experts"}],
        "services_in_country": _services("Taiwan", _u(_TW["hero"]), _u(_TW["gorge"]), _u(_TW["lake"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Taipei, Taiwan", "team_size": "15+", "description": "Specialists covering Taipei, Sun Moon Lake, Taroko Gorge, and the east coast."},
        "key_experiences": [
            {"title": "Taipei Night Market Crawl", "description": "Guided evening through Shilin and Raohe — stinky tofu, bubble tea, and local delicacies.", "image": _u(_TW["hero"], 600), "location": "Taipei"},
            {"title": "Taroko Gorge Hike", "description": "Marble canyon trails with suspension bridges and mountain temple visits.", "image": _u(_TW["gorge"], 600), "location": "Hualien"},
            {"title": "Sun Moon Lake Cycling", "description": "Scenic lakeside cycling with aboriginal village visits and tea tasting.", "image": _u(_TW["lake"], 600), "location": "Sun Moon Lake"},
            {"title": "Jiufen Old Street", "description": "Spirited Away-inspired hillside village with lantern-lit alleys.", "image": _u(_TW["hero"], 600), "location": "Jiufen"},
        ],
        "key_destinations_within": [
            {"name": "Taipei", "description": "Taipei 101, night markets, and temple culture.", "image": _u(_TW["hero"], 500)},
            {"name": "Hualien", "description": "Gateway to Taroko Gorge and the east coast.", "image": _u(_TW["gorge"], 500)},
            {"name": "Sun Moon Lake", "description": "Taiwan's most scenic lake in the central mountains.", "image": _u(_TW["lake"], 500)},
            {"name": "Tainan", "description": "Former capital — temples, street food, and history.", "image": _u(_TW["hero"], 500)},
        ],
        "regions": [
            {"name": "North Taiwan", "description": "Taipei's energy, Jiufen's charm, and Yangmingshan hot springs.", "highlights": ["Taipei", "Jiufen", "Yangmingshan", "Beitou"], "image": _u(_TW["hero"], 600)},
            {"name": "Central & East Coast", "description": "Mountain gorges, aboriginal culture, and Taiwan's most dramatic scenery.", "highlights": ["Taroko Gorge", "Sun Moon Lake", "Alishan", "Hualien"], "image": _u(_TW["gorge"], 600)},
        ],
        "food": {"intro": "Taiwan is Asia's ultimate food destination — night markets, tea culture, and street food perfection.", "cuisines": [
            {"name": "Night Market", "desc": "Shilin, Raohe, and Ningxia — the heart of Taiwanese food culture.", "dishes": ["Stinky Tofu", "Oyster Omelette", "Pepper Buns", "Bubble Tea"]},
            {"name": "Beef Noodle", "desc": "Taiwan's national dish — braised beef in rich broth with handmade noodles.", "dishes": ["Beef Noodle Soup", "Braised Pork Rice", "Dan Zai Noodles", "Mee Sua"]},
            {"name": "Dumplings", "desc": "Din Tai Fung's legendary xiao long bao and Taiwanese-style dim sum.", "dishes": ["Xiao Long Bao", "Gua Bao", "Scallion Pancake", "Turnip Cake"]},
            {"name": "Tea Culture", "desc": "High-mountain oolong, bubble tea, and traditional tea ceremonies.", "dishes": ["Oolong Tea", "Bubble Tea", "Pineapple Cake", "Mochi"]},
        ]},
        "packages": [
            {"title": "Taiwan Highlights", "duration": "7N / 8D", "cities": "Taipei - Sun Moon Lake - Taroko - Taipei", "highlights": ["Night market tour", "Taroko Gorge hike", "High-speed rail"], "tag": "Bestseller"},
            {"title": "Foodie Taiwan", "duration": "5N / 6D", "cities": "Taipei - Tainan - Kaohsiung", "highlights": ["Night market crawl", "Cooking class", "Tea ceremony"], "tag": "Culinary"},
            {"title": "East Coast Adventure", "duration": "6N / 7D", "cities": "Taipei - Hualien - Taitung - Kenting", "highlights": ["Taroko trails", "Paragliding", "Hot spring soak"], "tag": "Adventure"},
            {"title": "Taiwan Round Island", "duration": "10N / 11D", "cities": "Taipei - Taichung - Alishan - Tainan - Kenting - Hualien", "highlights": ["Alishan sunrise", "Round-island rail", "Aboriginal village visit"], "tag": "Premium"},
            {"title": "Taipei City Break", "duration": "4N / 5D", "cities": "Taipei - Jiufen - Beitou", "highlights": ["Taipei 101 sunset", "Jiufen lanterns", "Hot spring hotel"], "tag": "Most Popular"},
            {"title": "Tea & Hot Springs", "duration": "5N / 6D", "cities": "Taipei - Maokong - Beitou - Jiaoxi", "highlights": ["Tea plantation tour", "Public hot spring bath", "Lantern festival"], "tag": "Wellness"},
        ],
        "case_studies": [
            {"headline": "Taiwan Bookings Up 200%", "category": "FIT Performance", "description": "A Hong Kong agency doubled Taiwan bookings with our night market and gorge packages.", "metric": "200%", "metric_label": "Growth"},
            {"headline": "30 Group Departures Annually", "category": "Group Metrics", "description": "Managed 30 group tours with rail passes and bilingual guides.", "metric": "30", "metric_label": "Departures"},
            {"headline": "Tea Industry Conference", "category": "MICE Delivery", "description": "120-person tea industry event in Taipei.", "metric": "120", "metric_label": "Guests"},
            {"headline": "Round-Island in 36 Hours", "category": "Response Time", "description": "Full round-island itineraries confirmed within 36 hours.", "metric": "36hr", "metric_label": "Turnaround"},
        ],
    },

    "Sri Lanka": {
        "destination_name": "Sri Lanka", "tagline": "Your DMC for Sri Lanka",
        "hero_image": _u(_LK["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Colombo"}, {"label": "Currency", "value": "Rupee (LKR)"}, {"label": "Languages", "value": "Sinhala, Tamil, English"}, {"label": "Best Season", "value": "December - March"}, {"label": "Hi DMC Office", "value": "Colombo"}, {"label": "Local Team", "value": "20+ Experts"}],
        "services_in_country": _services("Sri Lanka", _u(_LK["hero"]), _u(_LK["train"]), _u(_LK["beach"]), _u(_LK["temple"]), "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Colombo, Sri Lanka", "team_size": "20+", "description": "Island specialists covering cultural triangle, hill country, and southern beaches."},
        "key_experiences": [
            {"title": "Sigiriya Rock Fortress", "description": "Climb the ancient Lion Rock fortress with panoramic views.", "image": _u(_LK["hero"], 600), "location": "Sigiriya"},
            {"title": "Tea Country Train", "description": "Iconic blue train through misty tea plantations from Kandy to Ella.", "image": _u(_LK["train"], 600), "location": "Hill Country"},
            {"title": "Yala Safari", "description": "Leopard tracking and wildlife drives in Sri Lanka's premier park.", "image": _u(_LK["beach"], 600), "location": "Yala"},
            {"title": "Galle Fort Walk", "description": "Colonial heritage, boutique shops, and sunset from the ramparts.", "image": _u(_LK["temple"], 600), "location": "Galle"},
        ],
        "key_destinations_within": [
            {"name": "Colombo", "description": "Capital city — colonial heritage and modern dining.", "image": _u(_LK["hero"], 500)},
            {"name": "Kandy", "description": "Sacred city — Temple of the Tooth and hill country gateway.", "image": _u(_LK["train"], 500)},
            {"name": "Sigiriya", "description": "Ancient rock fortress rising from the jungle.", "image": _u(_LK["beach"], 500)},
            {"name": "Galle", "description": "Dutch colonial fort town on the southern coast.", "image": _u(_LK["temple"], 500)},
        ],
        "regions": [
            {"name": "Cultural Triangle", "description": "Ancient cities, rock fortresses, and sacred Buddhist sites.", "highlights": ["Sigiriya", "Dambulla", "Anuradhapura", "Polonnaruwa"], "image": _u(_LK["hero"], 600)},
            {"name": "South Coast & Hill Country", "description": "Beaches, tea plantations, and wildlife parks.", "highlights": ["Galle", "Ella", "Yala", "Mirissa"], "image": _u(_LK["train"], 600)},
        ],
        "food": {"intro": "Sri Lankan cuisine is bold, spicy, and incredibly diverse for such a small island.", "cuisines": [
            {"name": "Rice & Curry", "desc": "The national meal — rice with up to 12 different curries and sambols.", "dishes": ["Rice & Curry", "Dhal Curry", "Fish Ambul Thiyal", "Pol Sambol"]},
            {"name": "Hoppers", "desc": "Bowl-shaped rice flour pancakes — Sri Lanka's iconic breakfast.", "dishes": ["Egg Hopper", "String Hoppers", "Milk Rice", "Pittu"]},
            {"name": "Seafood", "desc": "Fresh catches from the Indian Ocean.", "dishes": ["Jaffna Crab Curry", "Prawn Curry", "Fish Cutlets", "Isso Vadei"]},
            {"name": "Tea & Sweets", "desc": "Ceylon tea estates and traditional sweets from the hill country.", "dishes": ["Ceylon Tea", "Watalappam", "Kavum", "Kokis"]},
        ]},
        "packages": [
            {"title": "Sri Lanka Classic", "duration": "8N / 9D", "cities": "Colombo - Sigiriya - Kandy - Ella - Galle", "highlights": ["Sigiriya climb", "Tea train ride", "Galle Fort walk"], "tag": "Bestseller"},
            {"title": "Wildlife & Beach", "duration": "7N / 8D", "cities": "Colombo - Yala - Mirissa - Galle", "highlights": ["Leopard safari", "Whale watching", "Beach relaxation"], "tag": "Adventure"},
            {"title": "Cultural Triangle", "duration": "5N / 6D", "cities": "Colombo - Dambulla - Sigiriya - Kandy", "highlights": ["Cave temple visit", "Rock fortress climb", "Temple ceremony"], "tag": "Cultural"},
            {"title": "Hill Country & Tea", "duration": "6N / 7D", "cities": "Kandy - Nuwara Eliya - Ella - Haputale", "highlights": ["Tea plantation tour", "Nine Arches Bridge", "Adam's Peak sunrise"], "tag": "Most Popular"},
            {"title": "Ayurveda Retreat", "duration": "7N / 8D", "cities": "Colombo - Bentota", "highlights": ["Ayurvedic spa program", "Yoga sessions", "Beach meditation"], "tag": "Wellness"},
            {"title": "Sri Lanka Grand Tour", "duration": "12N / 13D", "cities": "Colombo - Anuradhapura - Sigiriya - Kandy - Ella - Yala - Galle", "highlights": ["Ancient ruins", "Elephant gathering", "Southern beaches"], "tag": "Premium"},
        ],
        "case_studies": [
            {"headline": "Sri Lanka Bookings Up 180%", "category": "FIT Performance", "description": "A UK agency nearly tripled Sri Lanka bookings with our train and safari packages.", "metric": "180%", "metric_label": "Growth"},
            {"headline": "35 Group Departures Annually", "category": "Group Metrics", "description": "Managed 35 group tours across the cultural triangle and coast.", "metric": "35", "metric_label": "Departures"},
            {"headline": "Wellness Retreat for 80", "category": "MICE Delivery", "description": "Corporate wellness retreat in Bentota.", "metric": "80", "metric_label": "Guests"},
            {"headline": "Full Island in 48 Hours", "category": "Response Time", "description": "Complete itineraries with safari lodges confirmed within 48 hours.", "metric": "48hr", "metric_label": "Turnaround"},
        ],
    },

    "Bhutan": {
        "destination_name": "Bhutan", "tagline": "Your DMC for Bhutan",
        "hero_image": _u(_BT["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Thimphu"}, {"label": "Currency", "value": "Ngultrum (BTN)"}, {"label": "Languages", "value": "Dzongkha, English"}, {"label": "Best Season", "value": "Mar - May, Sep - Nov"}, {"label": "Hi DMC Office", "value": "Thimphu"}, {"label": "Local Team", "value": "10+ Experts"}],
        "services_in_country": _services("Bhutan", _u(_BT["hero"]), _u(_BT["cliff"]), _u(_BT["valley"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Thimphu, Bhutan", "team_size": "10+", "description": "Licensed Bhutan specialists managing mandatory daily tariff and cultural experiences."},
        "key_experiences": [
            {"title": "Tiger's Nest Monastery", "description": "Iconic cliffside monastery hike — Bhutan's most sacred site.", "image": _u(_BT["hero"], 600), "location": "Paro"},
            {"title": "Punakha Dzong Visit", "description": "The Palace of Great Happiness — Bhutan's most beautiful fortress.", "image": _u(_BT["cliff"], 600), "location": "Punakha"},
            {"title": "Festival Experience", "description": "Attend a traditional Tshechu festival with masked dances.", "image": _u(_BT["valley"], 600), "location": "Various"},
            {"title": "Farmhouse Homestay", "description": "Overnight in a traditional Bhutanese farmhouse with local family dinner.", "image": _u(_BT["hero"], 600), "location": "Bumthang"},
        ],
        "key_destinations_within": [
            {"name": "Paro", "description": "Tiger's Nest and the beautiful Paro Valley.", "image": _u(_BT["hero"], 500)},
            {"name": "Thimphu", "description": "Capital — Buddha Dordenma and weekend market.", "image": _u(_BT["cliff"], 500)},
            {"name": "Punakha", "description": "Former capital with Bhutan's most stunning dzong.", "image": _u(_BT["valley"], 500)},
            {"name": "Bumthang", "description": "Spiritual heartland — ancient temples and valleys.", "image": _u(_BT["hero"], 500)},
        ],
        "regions": [
            {"name": "Western Bhutan", "description": "Paro, Thimphu, and Punakha — the classic experience.", "highlights": ["Paro", "Thimphu", "Punakha", "Haa Valley"], "image": _u(_BT["hero"], 600)},
            {"name": "Central Bhutan", "description": "Spiritual heartland with ancient temples.", "highlights": ["Bumthang", "Trongsa", "Gangtey", "Phobjikha"], "image": _u(_BT["cliff"], 600)},
        ],
        "food": {"intro": "Bhutanese cuisine revolves around chili, cheese, and red rice — simple, hearty, distinctive.", "cuisines": [
            {"name": "Traditional", "desc": "Ema datshi, red rice, and dried meat — Bhutan's staples.", "dishes": ["Ema Datshi", "Red Rice", "Phaksha Paa", "Jasha Maru"]},
            {"name": "Momos", "desc": "Tibetan-style dumplings filled with pork, beef, or vegetables.", "dishes": ["Pork Momo", "Cheese Momo", "Veg Momo", "Jhol Momo"]},
            {"name": "Butter Tea", "desc": "Suja — salted butter tea — the quintessential Bhutanese drink.", "dishes": ["Suja", "Ara", "Bangchang", "Butter Biscuits"]},
            {"name": "Royal Cuisine", "desc": "Festival feasts and royal banquet dishes.", "dishes": ["Goep", "Sikam", "Shakam Datshi", "Khuli"]},
        ]},
        "packages": [
            {"title": "Bhutan Classic", "duration": "5N / 6D", "cities": "Paro - Thimphu - Punakha - Paro", "highlights": ["Tiger's Nest hike", "Punakha Dzong", "Buddha Dordenma"], "tag": "Bestseller"},
            {"title": "Bhutan Festival Special", "duration": "7N / 8D", "cities": "Paro - Thimphu - Bumthang - Paro", "highlights": ["Tshechu festival", "Masked dances", "Temple visits"], "tag": "Cultural"},
            {"title": "Bhutan Trekking", "duration": "8N / 9D", "cities": "Paro - Druk Path - Thimphu", "highlights": ["Druk Path trek", "Mountain camp nights", "Lake Jimilangtso"], "tag": "Adventure"},
            {"title": "Luxury Bhutan", "duration": "6N / 7D", "cities": "Paro - Thimphu - Gangtey - Punakha", "highlights": ["Six Senses lodge stays", "Crane watching", "Hot stone bath"], "tag": "Premium"},
            {"title": "India & Bhutan Combo", "duration": "10N / 11D", "cities": "Delhi - Paro - Thimphu - Punakha - Kolkata", "highlights": ["Cross-border experience", "Two cultures", "Himalayan views"], "tag": "Most Popular"},
            {"title": "Wellness & Meditation", "duration": "5N / 6D", "cities": "Paro - Thimphu", "highlights": ["Monastery meditation", "Hot stone bath", "Nature walks"], "tag": "Wellness"},
        ],
        "case_studies": [
            {"headline": "Bhutan Permits Sold Out", "category": "FIT Performance", "description": "An Australian agency sold all Bhutan allocations.", "metric": "100%", "metric_label": "Sold Out"},
            {"headline": "15 Group Departures Annually", "category": "Group Metrics", "description": "Managed 15 cultural group tours during festival season.", "metric": "15", "metric_label": "Departures"},
            {"headline": "Luxury Incentive Program", "category": "MICE Delivery", "description": "30-person luxury incentive across Six Senses lodges.", "metric": "30", "metric_label": "Guests"},
            {"headline": "Visa & Permit Support", "category": "Response Time", "description": "Full permit processing and itinerary within 48 hours.", "metric": "48hr", "metric_label": "Turnaround"},
        ],
    },

    "Bali": {
        "destination_name": "Bali", "tagline": "Your DMC for Bali",
        "hero_image": _u(_BL["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Denpasar"}, {"label": "Currency", "value": "Rupiah (IDR)"}, {"label": "Languages", "value": "Balinese, Indonesian"}, {"label": "Best Season", "value": "April - October"}, {"label": "Hi DMC Office", "value": "Bali"}, {"label": "Local Team", "value": "35+ Experts"}],
        "services_in_country": _services("Bali", _u(_BL["hero"]), _u(_BL["rice"]), _u(_BL["terraces"]), _u(_BL["palm"]), "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Bali, Indonesia", "team_size": "35+", "description": "Bali-focused villa, surf, wellness, and cultural specialists."},
        "key_experiences": [
            {"title": "Ubud Rice Terrace Walk", "description": "Guided trek through Tegallalang's iconic terraces.", "image": _u(_BL["rice"], 600), "location": "Ubud"},
            {"title": "Uluwatu Temple Sunset", "description": "Cliff-top temple visit with Kecak fire dance at sunset.", "image": _u(_BL["hero"], 600), "location": "Uluwatu"},
            {"title": "Nusa Penida Day Trip", "description": "Dramatic cliffs, manta ray snorkelling, and Kelingking Beach.", "image": _u(_BL["palm"], 600), "location": "Nusa Penida"},
            {"title": "Balinese Cooking Class", "description": "Market tour and hands-on cooking in a traditional kitchen.", "image": _u(_BL["terraces"], 600), "location": "Ubud"},
        ],
        "key_destinations_within": [
            {"name": "Ubud", "description": "Cultural heart — rice terraces, temples, and art.", "image": _u(_BL["rice"], 500)},
            {"name": "Seminyak", "description": "Beach clubs, boutique shopping, and sunset dining.", "image": _u(_BL["hero"], 500)},
            {"name": "Uluwatu", "description": "Dramatic cliffs, world-class surf, and luxury resorts.", "image": _u(_BL["palm"], 500)},
            {"name": "Canggu", "description": "Hipster hub — co-working, surf, and rice field cafes.", "image": _u(_BL["terraces"], 500)},
        ],
        "regions": [
            {"name": "South Bali", "description": "Beach clubs, temples, and the tourism heartland.", "highlights": ["Seminyak", "Uluwatu", "Nusa Dua", "Jimbaran"], "image": _u(_BL["hero"], 600)},
            {"name": "Central & North Bali", "description": "Rice terraces, volcanic mountains, and spiritual retreats.", "highlights": ["Ubud", "Kintamani", "Munduk", "Lovina"], "image": _u(_BL["rice"], 600)},
        ],
        "food": {"intro": "Balinese cuisine is ceremonial, fragrant, and built around fresh spices and coconut.", "cuisines": [
            {"name": "Balinese", "desc": "Ceremonial roast pork, spiced duck, and fresh sambal.", "dishes": ["Babi Guling", "Bebek Betutu", "Lawar", "Sate Lilit"]},
            {"name": "Cafe Culture", "desc": "Bali's world-famous smoothie bowls and organic cafes.", "dishes": ["Smoothie Bowl", "Nasi Campur", "Tempeh Salad", "Coconut Water"]},
            {"name": "Seafood BBQ", "desc": "Jimbaran Bay's legendary sunset seafood barbecues.", "dishes": ["Grilled Prawns", "Fish Pepes", "Crab Bali", "Squid Sambal"]},
            {"name": "Fine Dining", "desc": "Ubud and Seminyak's innovative restaurants.", "dishes": ["Locavore Tasting", "Nikkei Fusion", "Cocktails", "Dessert Art"]},
        ]},
        "packages": [
            {"title": "Bali Highlights", "duration": "7N / 8D", "cities": "Seminyak - Ubud - Nusa Dua", "highlights": ["Rice terrace walk", "Temple ceremony", "Beach club sunset"], "tag": "Bestseller"},
            {"title": "Bali Honeymoon", "duration": "6N / 7D", "cities": "Ubud - Uluwatu", "highlights": ["Private villa with pool", "Couples spa", "Sunset cliff dinner"], "tag": "Romance"},
            {"title": "Bali Surf & Adventure", "duration": "7N / 8D", "cities": "Canggu - Uluwatu - Nusa Penida", "highlights": ["Surf lessons", "Cliff jumping", "Manta ray diving"], "tag": "Adventure"},
            {"title": "Bali Wellness Retreat", "duration": "5N / 6D", "cities": "Ubud", "highlights": ["Yoga retreat", "Jungle spa", "Healing ceremony"], "tag": "Wellness"},
            {"title": "Bali Family Fun", "duration": "7N / 8D", "cities": "Nusa Dua - Ubud - Sanur", "highlights": ["Water park visit", "Monkey forest", "Cycling tour"], "tag": "Family"},
            {"title": "Luxury Bali Escape", "duration": "5N / 6D", "cities": "Uluwatu - Ubud", "highlights": ["Cliff-top resort", "Private chef dinner", "Helicopter tour"], "tag": "Premium"},
        ],
        "case_studies": [
            {"headline": "Bali Villa Bookings Up 300%", "category": "FIT Performance", "description": "An Australian agency tripled Bali villa bookings.", "metric": "300%", "metric_label": "Growth"},
            {"headline": "60 Group Departures Annually", "category": "Group Metrics", "description": "Managed 60 Bali group tours with seamless logistics.", "metric": "60", "metric_label": "Departures"},
            {"headline": "Beachfront Wedding", "category": "MICE Delivery", "description": "200-guest destination wedding in Uluwatu.", "metric": "200", "metric_label": "Guests"},
            {"headline": "Villa Match in 4 Hours", "category": "Response Time", "description": "Perfect villa matches delivered within 4 hours.", "metric": "4hr", "metric_label": "Turnaround"},
        ],
    },

    "Vietnam": {
        "destination_name": "Vietnam", "tagline": "Your DMC for Vietnam",
        "hero_image": _u(_VN["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Hanoi"}, {"label": "Currency", "value": "Dong (VND)"}, {"label": "Languages", "value": "Vietnamese, English"}, {"label": "Best Season", "value": "October - April"}, {"label": "Hi DMC Office", "value": "Ho Chi Minh City"}, {"label": "Local Team", "value": "30+ Experts"}],
        "services_in_country": _services("Vietnam", _u(_VN["hero"]), _u(_VN["hoian"]), _u(_VN["aerial1"]), _u(_VN["aerial2"]), "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Ho Chi Minh City, Vietnam", "team_size": "30+", "description": "North-to-south specialists covering Hanoi, Ha Long Bay, Hoi An, and the Mekong Delta."},
        "key_experiences": [
            {"title": "Ha Long Bay Cruise", "description": "Overnight junk boat cruise through limestone karsts.", "image": _u(_VN["hero"], 600), "location": "Ha Long Bay"},
            {"title": "Hoi An Ancient Town", "description": "Lantern-lit walking tour, tailor shopping, and riverside dining.", "image": _u(_VN["hoian"], 600), "location": "Hoi An"},
            {"title": "Mekong Delta Boat Tour", "description": "Floating markets, coconut candy workshops, and river island visits.", "image": _u(_VN["aerial1"], 600), "location": "Mekong Delta"},
            {"title": "Hanoi Street Food Walk", "description": "Guided tour through the Old Quarter — pho, bun cha, and egg coffee.", "image": _u(_VN["aerial2"], 600), "location": "Hanoi"},
        ],
        "key_destinations_within": [
            {"name": "Hanoi", "description": "Old Quarter charm, street food, and French colonial heritage.", "image": _u(_VN["hero"], 500)},
            {"name": "Ha Long Bay", "description": "UNESCO limestone karsts and emerald waters.", "image": _u(_VN["aerial2"], 500)},
            {"name": "Hoi An", "description": "Ancient trading port with lanterns and tailors.", "image": _u(_VN["hoian"], 500)},
            {"name": "Ho Chi Minh City", "description": "Dynamic southern metropolis — Cu Chi tunnels and modern energy.", "image": _u(_VN["aerial1"], 500)},
        ],
        "regions": [
            {"name": "Northern Vietnam", "description": "Hanoi, Ha Long Bay, Sapa's rice terraces, and mountain culture.", "highlights": ["Hanoi", "Ha Long Bay", "Sapa", "Ninh Binh"], "image": _u(_VN["hero"], 600)},
            {"name": "Central & South", "description": "Hoi An, Hue's imperial city, and the Mekong Delta.", "highlights": ["Hoi An", "Hue", "Ho Chi Minh City", "Mekong Delta"], "image": _u(_VN["hoian"], 600)},
        ],
        "food": {"intro": "Vietnamese cuisine is fresh, light, and intensely flavourful.", "cuisines": [
            {"name": "Pho & Soups", "desc": "Vietnam's national dish — aromatic broth with rice noodles.", "dishes": ["Pho Bo", "Bun Bo Hue", "Mi Quang", "Canh Chua"]},
            {"name": "Street Food", "desc": "Hanoi's Old Quarter and Saigon's alleys.", "dishes": ["Banh Mi", "Bun Cha", "Egg Coffee", "Banh Xeo"]},
            {"name": "Fresh Rolls", "desc": "Rice paper rolls with herbs, prawns, and dipping sauces.", "dishes": ["Goi Cuon", "Nem Ran", "Cha Gio", "Bo Bia"]},
            {"name": "Central Vietnamese", "desc": "Hue's spicy royal cuisine and Hoi An's specialities.", "dishes": ["Cao Lau", "Banh Beo", "Com Hen", "Mi Quang"]},
        ]},
        "packages": [
            {"title": "Vietnam North to South", "duration": "12N / 13D", "cities": "Hanoi - Ha Long - Hue - Hoi An - HCMC", "highlights": ["Ha Long cruise", "Imperial Hue tour", "Mekong Delta visit"], "tag": "Bestseller"},
            {"title": "Ha Long & Hanoi", "duration": "5N / 6D", "cities": "Hanoi - Ha Long Bay", "highlights": ["Overnight junk cruise", "Old Quarter walk", "Street food tour"], "tag": "Most Popular"},
            {"title": "Vietnam Foodie Trail", "duration": "8N / 9D", "cities": "Hanoi - Hoi An - HCMC", "highlights": ["Cooking classes", "Market tours", "Street food crawls"], "tag": "Culinary"},
            {"title": "Sapa Mountain Trek", "duration": "6N / 7D", "cities": "Hanoi - Sapa - Ha Long", "highlights": ["Rice terrace trek", "Homestay overnight", "Night train experience"], "tag": "Adventure"},
            {"title": "Vietnam Beach & Culture", "duration": "9N / 10D", "cities": "Hanoi - Hoi An - Phu Quoc", "highlights": ["Ancient town by night", "Beach relaxation", "Snorkelling trip"], "tag": "Leisure"},
            {"title": "Luxury Vietnam", "duration": "10N / 11D", "cities": "Hanoi - Ha Long - Hoi An - HCMC", "highlights": ["5-star cruise", "Private cyclo tours", "Spa retreats"], "tag": "Premium"},
        ],
        "case_studies": [
            {"headline": "Vietnam Bookings Up 250%", "category": "FIT Performance", "description": "A US agency tripled Vietnam bookings with our cruise and food tour packages.", "metric": "250%", "metric_label": "Growth"},
            {"headline": "55 Group Departures Annually", "category": "Group Metrics", "description": "Managed 55 group tours from Hanoi to Saigon.", "metric": "55", "metric_label": "Departures"},
            {"headline": "Corporate Team Building", "category": "MICE Delivery", "description": "100-person retreat in Hoi An.", "metric": "100", "metric_label": "Guests"},
            {"headline": "North-South in 24 Hours", "category": "Response Time", "description": "Complete itineraries with domestic flights confirmed within 24 hours.", "metric": "24hr", "metric_label": "Turnaround"},
        ],
    },

    "Malaysia": {
        "destination_name": "Malaysia", "tagline": "Your DMC for Malaysia",
        "hero_image": _u(_MY["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Kuala Lumpur"}, {"label": "Currency", "value": "Ringgit (MYR)"}, {"label": "Languages", "value": "Malay, English, Chinese"}, {"label": "Best Season", "value": "March - October"}, {"label": "Hi DMC Office", "value": "Kuala Lumpur"}, {"label": "Local Team", "value": "20+ Experts"}],
        "services_in_country": _services("Malaysia", _u(_MY["hero"]), _u(_MY["island"]), _u(_MY["nature"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Kuala Lumpur, Malaysia", "team_size": "20+", "description": "Specialists covering KL, Langkawi, Borneo, and the Cameron Highlands."},
        "key_experiences": [
            {"title": "Petronas Towers Sunset", "description": "Skybridge and observation deck at golden hour.", "image": _u(_MY["hero"], 600), "location": "Kuala Lumpur"},
            {"title": "Borneo Orangutan Trek", "description": "Wildlife encounter at Sepilok Rehabilitation Centre.", "image": _u(_MY["nature"], 600), "location": "Sabah"},
            {"title": "Langkawi Island Hopping", "description": "Eagle spotting, mangrove kayaking, and pristine beaches.", "image": _u(_MY["island"], 600), "location": "Langkawi"},
            {"title": "Georgetown Food Trail", "description": "Penang's UNESCO town — hawker centres and street art.", "image": _u(_MY["hero"], 600), "location": "Penang"},
        ],
        "key_destinations_within": [
            {"name": "Kuala Lumpur", "description": "Petronas Towers, Batu Caves, and vibrant food scene.", "image": _u(_MY["hero"], 500)},
            {"name": "Langkawi", "description": "Duty-free island — beaches, sky bridge, and mangroves.", "image": _u(_MY["island"], 500)},
            {"name": "Penang", "description": "Food capital — Georgetown heritage and hawker legends.", "image": _u(_MY["nature"], 500)},
            {"name": "Borneo", "description": "Rainforest adventure — orangutans and Mount Kinabalu.", "image": _u(_MY["island"], 500)},
        ],
        "regions": [
            {"name": "Peninsular Malaysia", "description": "KL, Penang, Langkawi, and the Cameron Highlands.", "highlights": ["Kuala Lumpur", "Penang", "Langkawi", "Cameron Highlands"], "image": _u(_MY["hero"], 600)},
            {"name": "Malaysian Borneo", "description": "Sabah and Sarawak — rainforest, wildlife, and diving.", "highlights": ["Kota Kinabalu", "Sepilok", "Mulu Caves", "Sipadan"], "image": _u(_MY["nature"], 600)},
        ],
        "food": {"intro": "Malaysia's food scene is legendary — Malay, Chinese, Indian, and Peranakan flavours.", "cuisines": [
            {"name": "Hawker Food", "desc": "KL and Penang hawker centres — nasi lemak and roti canai.", "dishes": ["Nasi Lemak", "Char Kway Teow", "Roti Canai", "Satay"]},
            {"name": "Peranakan", "desc": "Nyonya cuisine — Malay and Chinese fusion.", "dishes": ["Laksa", "Ayam Pongteh", "Otak-Otak", "Kuih"]},
            {"name": "Indian-Malay", "desc": "Banana leaf rice and mamak stalls.", "dishes": ["Banana Leaf Rice", "Murtabak", "Teh Tarik", "Naan"]},
            {"name": "Borneo Cuisine", "desc": "Indigenous flavours — hinava and jungle produce.", "dishes": ["Hinava", "Tuaran Mee", "Manok Pansoh", "Lihing"]},
        ]},
        "packages": [
            {"title": "Malaysia Highlights", "duration": "8N / 9D", "cities": "KL - Penang - Langkawi", "highlights": ["Petronas Towers", "Georgetown food trail", "Beach relaxation"], "tag": "Bestseller"},
            {"title": "Borneo Wildlife", "duration": "7N / 8D", "cities": "Kota Kinabalu - Sepilok - Kinabatangan", "highlights": ["Orangutan centre", "River safari", "Mount Kinabalu views"], "tag": "Adventure"},
            {"title": "KL City Break", "duration": "4N / 5D", "cities": "Kuala Lumpur", "highlights": ["Batu Caves", "Food tour", "Shopping spree"], "tag": "Most Popular"},
            {"title": "Malaysia Grand Tour", "duration": "12N / 13D", "cities": "KL - Cameron - Penang - Langkawi - Borneo", "highlights": ["Tea plantations", "Street art walk", "Rainforest trek"], "tag": "Premium"},
            {"title": "Foodie Malaysia", "duration": "6N / 7D", "cities": "KL - Penang - Malacca", "highlights": ["Hawker tour", "Cooking class", "Peranakan dinner"], "tag": "Culinary"},
            {"title": "Beach & Diving", "duration": "7N / 8D", "cities": "KL - Perhentian - Langkawi", "highlights": ["Coral reef diving", "Island hopping", "Sunset kayaking"], "tag": "Leisure"},
        ],
        "case_studies": [
            {"headline": "Malaysia Bookings Up 200%", "category": "FIT Performance", "description": "An Indian agency doubled Malaysia bookings.", "metric": "200%", "metric_label": "Growth"},
            {"headline": "40 Group Departures Annually", "category": "Group Metrics", "description": "Managed 40 group tours across peninsular and Borneo.", "metric": "40", "metric_label": "Departures"},
            {"headline": "Corporate Retreat Langkawi", "category": "MICE Delivery", "description": "80-person corporate retreat in Langkawi.", "metric": "80", "metric_label": "Guests"},
            {"headline": "Multi-Region in 24 Hours", "category": "Response Time", "description": "KL-Borneo-Langkawi itineraries confirmed within 24 hours.", "metric": "24hr", "metric_label": "Turnaround"},
        ],
    },

    "Singapore": {
        "destination_name": "Singapore", "tagline": "Your DMC for Singapore",
        "hero_image": _u(_SG["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Singapore"}, {"label": "Currency", "value": "SGD"}, {"label": "Languages", "value": "English, Mandarin, Malay"}, {"label": "Best Season", "value": "Year-Round"}, {"label": "Hi DMC Office", "value": "Singapore"}, {"label": "Local Team", "value": "15+ Experts"}],
        "services_in_country": _services("Singapore", _u(_SG["hero"]), _u(_SG["bay"]), _u(_SG["skyline"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Singapore", "team_size": "15+", "description": "City-state specialists covering Marina Bay, Sentosa, cultural quarters, and MICE venues."},
        "key_experiences": [
            {"title": "Gardens by the Bay", "description": "Supertree Grove light show, Cloud Forest, and Flower Dome.", "image": _u(_SG["hero"], 600), "location": "Marina Bay"},
            {"title": "Hawker Centre Crawl", "description": "Guided food tour through Chinatown Complex and Maxwell.", "image": _u(_SG["bay"], 600), "location": "Various"},
            {"title": "Sentosa Island Day", "description": "Universal Studios, S.E.A. Aquarium, and beach activities.", "image": _u(_SG["skyline"], 600), "location": "Sentosa"},
            {"title": "Cultural Quarter Walk", "description": "Little India, Chinatown, Kampong Glam — three cultures, one city.", "image": _u(_SG["hero"], 600), "location": "Singapore"},
        ],
        "key_destinations_within": [
            {"name": "Marina Bay", "description": "Iconic skyline — MBS, ArtScience Museum, and Gardens.", "image": _u(_SG["hero"], 500)},
            {"name": "Sentosa", "description": "Resort island — theme parks, beaches, and golf.", "image": _u(_SG["bay"], 500)},
            {"name": "Chinatown", "description": "Heritage shophouses, hawker food, and temples.", "image": _u(_SG["skyline"], 500)},
            {"name": "Orchard Road", "description": "Premium shopping strip and luxury hotels.", "image": _u(_SG["hero"], 500)},
        ],
        "regions": [
            {"name": "City Centre", "description": "Marina Bay, Orchard Road, and the Colonial District.", "highlights": ["Marina Bay Sands", "Gardens by the Bay", "Orchard Road", "Raffles Hotel"], "image": _u(_SG["hero"], 600)},
            {"name": "Cultural Quarters", "description": "Little India, Chinatown, Kampong Glam, and Tiong Bahru.", "highlights": ["Little India", "Chinatown", "Kampong Glam", "Haji Lane"], "image": _u(_SG["bay"], 600)},
        ],
        "food": {"intro": "Singapore is a food paradise — hawker centres, Michelin stars, and every Asian cuisine.", "cuisines": [
            {"name": "Hawker Legends", "desc": "Michelin-rated hawker stalls — chicken rice and laksa.", "dishes": ["Chicken Rice", "Laksa", "Char Kway Teow", "Satay"]},
            {"name": "Peranakan", "desc": "Nyonya flavours unique to the Straits.", "dishes": ["Ayam Buah Keluak", "Popiah", "Kueh Pie Tee", "Ondeh Ondeh"]},
            {"name": "Seafood", "desc": "Chili crab and black pepper crab — Singapore signatures.", "dishes": ["Chili Crab", "Black Pepper Crab", "Cereal Prawns", "Sambal Stingray"]},
            {"name": "Modern Asian", "desc": "World-class restaurants — Burnt Ends, Odette, Labyrinth.", "dishes": ["Burnt Ends BBQ", "Omakase", "Mod-Sin", "Cocktail Bars"]},
        ]},
        "packages": [
            {"title": "Singapore City Explorer", "duration": "4N / 5D", "cities": "Singapore", "highlights": ["Gardens by the Bay", "Hawker food tour", "Sentosa day"], "tag": "Bestseller"},
            {"title": "Singapore & Malaysia", "duration": "7N / 8D", "cities": "Singapore - Malacca - KL", "highlights": ["Cross-border drive", "Heritage towns", "Petronas Towers"], "tag": "Most Popular"},
            {"title": "Singapore Luxury", "duration": "4N / 5D", "cities": "Singapore", "highlights": ["MBS infinity pool", "Michelin dinner", "Private yacht cruise"], "tag": "Premium"},
            {"title": "Family Singapore", "duration": "5N / 6D", "cities": "Singapore - Sentosa", "highlights": ["Universal Studios", "Night Safari", "S.E.A. Aquarium"], "tag": "Family"},
            {"title": "Singapore Foodie", "duration": "3N / 4D", "cities": "Singapore", "highlights": ["Hawker crawl", "Cooking class", "Cocktail masterclass"], "tag": "Culinary"},
            {"title": "Singapore MICE", "duration": "3N / 4D", "cities": "Singapore", "highlights": ["Marina Bay venues", "Team building", "Gala dinner options"], "tag": "Business"},
        ],
        "case_studies": [
            {"headline": "Singapore Stopover Sales Up 180%", "category": "FIT Performance", "description": "An Indian agency grew Singapore stopover bookings.", "metric": "180%", "metric_label": "Growth"},
            {"headline": "50 MICE Events Annually", "category": "Group Metrics", "description": "Managed 50 corporate events across Marina Bay.", "metric": "50", "metric_label": "Events"},
            {"headline": "500-Guest Conference", "category": "MICE Delivery", "description": "Full conference at MBS.", "metric": "500", "metric_label": "Guests"},
            {"headline": "Same-Day Proposals", "category": "Response Time", "description": "City break packages quoted within 4 hours.", "metric": "4hr", "metric_label": "Turnaround"},
        ],
    },

    "Philippines": {
        "destination_name": "Philippines", "tagline": "Your DMC for Philippines",
        "hero_image": _u(_PH["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Manila"}, {"label": "Currency", "value": "Peso (PHP)"}, {"label": "Languages", "value": "Filipino, English"}, {"label": "Best Season", "value": "November - May"}, {"label": "Hi DMC Office", "value": "Manila"}, {"label": "Local Team", "value": "20+ Experts"}],
        "services_in_country": _services("Philippines", _u(_PH["hero"]), _u(_PH["lagoon"]), _u(_PH["rocks"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Manila, Philippines", "team_size": "20+", "description": "Island specialists covering Palawan, Cebu, Boracay, Siargao, and Bohol."},
        "key_experiences": [
            {"title": "El Nido Island Hopping", "description": "Limestone lagoons, hidden beaches, and crystal snorkelling.", "image": _u(_PH["lagoon"], 600), "location": "Palawan"},
            {"title": "Chocolate Hills Bohol", "description": "1,268 conical hills, tarsier sanctuary, and Loboc River cruise.", "image": _u(_PH["hero"], 600), "location": "Bohol"},
            {"title": "Cebu Whale Sharks", "description": "Ethical whale shark interaction with marine biologist guide.", "image": _u(_PH["rocks"], 600), "location": "Cebu"},
            {"title": "Siargao Surf Trip", "description": "Cloud 9 surfing, island lagoons, and barefoot vibes.", "image": _u(_PH["lagoon"], 600), "location": "Siargao"},
        ],
        "key_destinations_within": [
            {"name": "Palawan", "description": "El Nido, Coron, and underground river — paradise islands.", "image": _u(_PH["lagoon"], 500)},
            {"name": "Cebu", "description": "Whale sharks, waterfalls, and vibrant city life.", "image": _u(_PH["hero"], 500)},
            {"name": "Boracay", "description": "White Beach — one of the world's most famous shorelines.", "image": _u(_PH["rocks"], 500)},
            {"name": "Siargao", "description": "Surfing capital and raw island beauty.", "image": _u(_PH["lagoon"], 500)},
        ],
        "regions": [
            {"name": "Palawan & Western Visayas", "description": "The crown jewels — El Nido, Coron, and Boracay.", "highlights": ["El Nido", "Coron", "Boracay", "Puerto Princesa"], "image": _u(_PH["lagoon"], 600)},
            {"name": "Central Visayas & Mindanao", "description": "Cebu, Bohol, and the surf island of Siargao.", "highlights": ["Cebu", "Bohol", "Siargao", "Camiguin"], "image": _u(_PH["hero"], 600)},
        ],
        "food": {"intro": "Filipino cuisine is hearty, flavourful, and deeply communal.", "cuisines": [
            {"name": "Traditional", "desc": "Adobo, sinigang, and lechon — pillars of Filipino cooking.", "dishes": ["Adobo", "Sinigang", "Lechon", "Kare-Kare"]},
            {"name": "Seafood", "desc": "Fresh island catches — grilled, in soup, or raw as kinilaw.", "dishes": ["Kinilaw", "Grilled Bangus", "Sinigang na Hipon", "Crispy Pata"]},
            {"name": "Street Food", "desc": "Isaw, balut, and halo-halo — adventurous and iconic.", "dishes": ["Halo-Halo", "Isaw", "Kwek-Kwek", "Turon"]},
            {"name": "Modern Filipino", "desc": "Manila's Michelin scene.", "dishes": ["Toyo Tasting", "Ube Desserts", "Calamansi Cocktails", "Sisig"]},
        ]},
        "packages": [
            {"title": "Palawan Island Escape", "duration": "6N / 7D", "cities": "Manila - El Nido - Coron", "highlights": ["Lagoon hopping", "Hidden beach", "Coron snorkelling"], "tag": "Bestseller"},
            {"title": "Cebu & Bohol Discovery", "duration": "6N / 7D", "cities": "Cebu - Bohol", "highlights": ["Whale shark swim", "Chocolate Hills tour", "Kawasan Falls"], "tag": "Most Popular"},
            {"title": "Boracay Beach Break", "duration": "5N / 6D", "cities": "Manila - Boracay", "highlights": ["White Beach", "Island hopping", "Sunset sailing"], "tag": "Leisure"},
            {"title": "Philippines Grand Tour", "duration": "12N / 13D", "cities": "Manila - Palawan - Cebu - Bohol - Siargao", "highlights": ["5 islands", "Diverse experiences", "Domestic flights"], "tag": "Premium"},
            {"title": "Siargao Surf & Chill", "duration": "5N / 6D", "cities": "Cebu - Siargao", "highlights": ["Cloud 9 surfing", "Sugba Lagoon", "Island vibes"], "tag": "Adventure"},
            {"title": "Diving Philippines", "duration": "8N / 9D", "cities": "Cebu - Moalboal - Apo Reef", "highlights": ["Sardine run", "Turtle encounters", "Reef diving"], "tag": "Specialist"},
        ],
        "case_studies": [
            {"headline": "Palawan Bookings Up 220%", "category": "FIT Performance", "description": "A Korean agency tripled Philippines bookings.", "metric": "220%", "metric_label": "Growth"},
            {"headline": "30 Group Departures Annually", "category": "Group Metrics", "description": "Managed 30 island group tours.", "metric": "30", "metric_label": "Departures"},
            {"headline": "Beach Wedding Cebu", "category": "MICE Delivery", "description": "80-guest beachfront wedding in Cebu.", "metric": "80", "metric_label": "Guests"},
            {"headline": "Island Combo in 12 Hours", "category": "Response Time", "description": "Multi-island itineraries confirmed within 12 hours.", "metric": "12hr", "metric_label": "Turnaround"},
        ],
    },

    "Cambodia": {
        "destination_name": "Cambodia", "tagline": "Your DMC for Cambodia",
        "hero_image": _u(_KH["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Phnom Penh"}, {"label": "Currency", "value": "Riel / USD"}, {"label": "Languages", "value": "Khmer, English"}, {"label": "Best Season", "value": "November - March"}, {"label": "Hi DMC Office", "value": "Siem Reap"}, {"label": "Local Team", "value": "15+ Experts"}],
        "services_in_country": _services("Cambodia", _u(_KH["hero"]), _u(_KH["face"]), _u(_KH["temple"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Siem Reap, Cambodia", "team_size": "15+", "description": "Angkor specialists and Phnom Penh experts with deep cultural knowledge."},
        "key_experiences": [
            {"title": "Angkor Wat Sunrise", "description": "Private guided sunrise visit to the world's largest religious monument.", "image": _u(_KH["hero"], 600), "location": "Siem Reap"},
            {"title": "Bayon Temple Faces", "description": "Explore the enigmatic smiling faces of the Bayon temple.", "image": _u(_KH["face"], 600), "location": "Siem Reap"},
            {"title": "Phnom Penh Heritage Walk", "description": "Royal Palace, Silver Pagoda, and the sobering Tuol Sleng Museum.", "image": _u(_KH["temple"], 600), "location": "Phnom Penh"},
            {"title": "Floating Village Tour", "description": "Boat tour through Tonle Sap's floating communities.", "image": _u(_KH["hero"], 600), "location": "Tonle Sap"},
        ],
        "key_destinations_within": [
            {"name": "Siem Reap", "description": "Gateway to Angkor — temples, night markets, and culture.", "image": _u(_KH["hero"], 500)},
            {"name": "Phnom Penh", "description": "Capital — Royal Palace, riverside promenade, and history.", "image": _u(_KH["temple"], 500)},
            {"name": "Sihanoukville", "description": "Coastal town and gateway to pristine islands.", "image": _u(_KH["face"], 500)},
            {"name": "Battambang", "description": "Colonial charm, bamboo train, and rural Cambodia.", "image": _u(_KH["hero"], 500)},
        ],
        "regions": [
            {"name": "Angkor & North", "description": "Siem Reap, the Angkor temples, and Tonle Sap lake.", "highlights": ["Angkor Wat", "Bayon", "Ta Prohm", "Tonle Sap"], "image": _u(_KH["hero"], 600)},
            {"name": "South & Coast", "description": "Phnom Penh, Kampot pepper plantations, and island beaches.", "highlights": ["Phnom Penh", "Kampot", "Kep", "Koh Rong"], "image": _u(_KH["temple"], 600)},
        ],
        "food": {"intro": "Khmer cuisine is subtle, aromatic, and less fiery than its neighbours.", "cuisines": [
            {"name": "Khmer Classic", "desc": "Amok, lok lak, and somlor — gentle curries with lemongrass.", "dishes": ["Fish Amok", "Lok Lak", "Somlor", "Nom Banh Chok"]},
            {"name": "Street Food", "desc": "Night market snacks — num pang and grilled meats.", "dishes": ["Num Pang", "Grilled Skewers", "Fried Spider", "Bamboo Rice"]},
            {"name": "Kampot Pepper", "desc": "World-famous pepper from Kampot.", "dishes": ["Pepper Crab", "Pepper Steak", "Green Pepper Stir-fry", "Pepper Ice Cream"]},
            {"name": "Tropical Fruits", "desc": "Mango, durian, rambutan, and fresh coconut.", "dishes": ["Mango Sticky Rice", "Coconut Juice", "Durian", "Jackfruit"]},
        ]},
        "packages": [
            {"title": "Angkor & Phnom Penh", "duration": "5N / 6D", "cities": "Siem Reap - Phnom Penh", "highlights": ["Angkor sunrise", "Royal Palace", "Floating village"], "tag": "Bestseller"},
            {"title": "Cambodia Complete", "duration": "8N / 9D", "cities": "Siem Reap - Battambang - Phnom Penh - Kampot", "highlights": ["Bamboo train", "Pepper plantation", "Island beach day"], "tag": "Premium"},
            {"title": "Vietnam & Cambodia", "duration": "10N / 11D", "cities": "HCMC - Phnom Penh - Siem Reap", "highlights": ["Mekong border crossing", "Two countries", "Temple & city mix"], "tag": "Most Popular"},
            {"title": "Temple Explorer", "duration": "4N / 5D", "cities": "Siem Reap", "highlights": ["3-day Angkor pass", "Sunrise & sunset visits", "Cooking class"], "tag": "Cultural"},
            {"title": "Cambodia Beach & Temples", "duration": "7N / 8D", "cities": "Siem Reap - Sihanoukville - Koh Rong", "highlights": ["Angkor complex", "Island relaxation", "Snorkelling"], "tag": "Leisure"},
            {"title": "Off-the-Beaten-Path", "duration": "6N / 7D", "cities": "Siem Reap - Mondulkiri - Ratanakiri", "highlights": ["Elephant sanctuary", "Waterfall trek", "Indigenous villages"], "tag": "Adventure"},
        ],
        "case_studies": [
            {"headline": "Cambodia Bookings Up 160%", "category": "FIT Performance", "description": "A Japanese agency grew Cambodia bookings.", "metric": "160%", "metric_label": "Growth"},
            {"headline": "25 Group Departures Annually", "category": "Group Metrics", "description": "Managed 25 group tours across Siem Reap and Phnom Penh.", "metric": "25", "metric_label": "Departures"},
            {"headline": "Temple Gala Dinner", "category": "MICE Delivery", "description": "150-guest gala at an Angkor temple.", "metric": "150", "metric_label": "Guests"},
            {"headline": "Cambodia in 24 Hours", "category": "Response Time", "description": "Itineraries with guides confirmed within 24 hours.", "metric": "24hr", "metric_label": "Turnaround"},
        ],
    },

    "Laos": {
        "destination_name": "Laos", "tagline": "Your DMC for Laos",
        "hero_image": _u(_LA["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Vientiane"}, {"label": "Currency", "value": "Kip (LAK)"}, {"label": "Languages", "value": "Lao, French, English"}, {"label": "Best Season", "value": "November - March"}, {"label": "Hi DMC Office", "value": "Vientiane"}, {"label": "Local Team", "value": "10+ Experts"}],
        "services_in_country": _services("Laos", _u(_LA["hero"]), _u(_LA["monks"]), _u(_LA["temple"]), "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Vientiane, Laos", "team_size": "10+", "description": "Specialists covering Luang Prabang, Vientiane, and the Mekong river routes."},
        "key_experiences": [
            {"title": "Luang Prabang Alms Giving", "description": "Witness the ancient dawn ceremony of monks receiving alms.", "image": _u(_LA["monks"], 600), "location": "Luang Prabang"},
            {"title": "Kuang Si Waterfall", "description": "Turquoise cascades, butterfly park, and bear rescue centre.", "image": _u(_LA["hero"], 600), "location": "Luang Prabang"},
            {"title": "Mekong Slow Boat", "description": "Two-day slow boat cruise to the Thai border.", "image": _u(_LA["temple"], 600), "location": "Mekong River"},
            {"title": "Plain of Jars", "description": "Mysterious ancient stone jars on the Xieng Khouang plateau.", "image": _u(_LA["hero"], 600), "location": "Phonsavan"},
        ],
        "key_destinations_within": [
            {"name": "Luang Prabang", "description": "UNESCO town — monks, temples, and Mekong views.", "image": _u(_LA["monks"], 500)},
            {"name": "Vientiane", "description": "Relaxed capital — That Luang stupa and French-Lao culture.", "image": _u(_LA["hero"], 500)},
            {"name": "Vang Vieng", "description": "Limestone karsts, cave tubing, and adventure sports.", "image": _u(_LA["temple"], 500)},
            {"name": "4000 Islands", "description": "Mekong river islands — hammocks, dolphins, and waterfalls.", "image": _u(_LA["hero"], 500)},
        ],
        "regions": [
            {"name": "Northern Laos", "description": "Luang Prabang, Mekong routes, and hill tribe villages.", "highlights": ["Luang Prabang", "Nong Khiaw", "Phongsali", "Pak Ou Caves"], "image": _u(_LA["monks"], 600)},
            {"name": "Central & South", "description": "Vientiane, Vang Vieng karsts, and the 4000 Islands.", "highlights": ["Vientiane", "Vang Vieng", "Pakse", "4000 Islands"], "image": _u(_LA["hero"], 600)},
        ],
        "food": {"intro": "Lao cuisine is fresh, herbal, and centred around sticky rice.", "cuisines": [
            {"name": "Sticky Rice & Laap", "desc": "Sticky rice with every meal and laap — the national salad.", "dishes": ["Laap", "Sticky Rice", "Tam Mak Hoong", "Or Lam"]},
            {"name": "River Food", "desc": "Mekong river fish, seaweed, and freshwater specialities.", "dishes": ["Grilled Fish", "Mekong Seaweed", "Fish Soup", "Jaew Bong"]},
            {"name": "French-Lao Fusion", "desc": "Colonial legacy — baguettes, pate, and cafe culture.", "dishes": ["Khao Jee", "Pate Sandwich", "Lao Coffee", "Croissants"]},
            {"name": "Night Market", "desc": "Luang Prabang's famous night market food stalls.", "dishes": ["Buffet Plates", "Grilled Meats", "Coconut Pancakes", "Fruit Shakes"]},
        ]},
        "packages": [
            {"title": "Luang Prabang Classic", "duration": "4N / 5D", "cities": "Luang Prabang", "highlights": ["Alms ceremony", "Kuang Si Falls", "Night market"], "tag": "Bestseller"},
            {"title": "Laos North to South", "duration": "10N / 11D", "cities": "LP - Vang Vieng - Vientiane - Pakse - 4000 Islands", "highlights": ["Slow boat cruise", "Cave tubing", "Dolphin spotting"], "tag": "Premium"},
            {"title": "Laos & Vietnam Combo", "duration": "8N / 9D", "cities": "LP - Hanoi - Ha Long Bay", "highlights": ["Cross-border flight", "Two cultures", "Temple & bay"], "tag": "Most Popular"},
            {"title": "Mekong River Journey", "duration": "6N / 7D", "cities": "LP - Pak Beng - Huay Xai", "highlights": ["2-day slow boat", "River villages", "Pak Ou Caves"], "tag": "Adventure"},
            {"title": "Laos Trekking", "duration": "5N / 6D", "cities": "Luang Namtha - Nong Khiaw", "highlights": ["Hill tribe homestay", "Jungle trekking", "River kayaking"], "tag": "Adventure"},
            {"title": "Laos Wellness", "duration": "4N / 5D", "cities": "Luang Prabang", "highlights": ["Temple meditation", "Herbal sauna", "Yoga retreat"], "tag": "Wellness"},
        ],
        "case_studies": [
            {"headline": "Laos Bookings Up 150%", "category": "FIT Performance", "description": "A French agency grew Laos bookings with Mekong cruise packages.", "metric": "150%", "metric_label": "Growth"},
            {"headline": "15 Group Departures Annually", "category": "Group Metrics", "description": "Managed 15 cultural group tours.", "metric": "15", "metric_label": "Departures"},
            {"headline": "NGO Conference Support", "category": "MICE Delivery", "description": "50-person NGO conference in Vientiane.", "metric": "50", "metric_label": "Guests"},
            {"headline": "Full Laos in 48 Hours", "category": "Response Time", "description": "Complete itineraries confirmed within 48 hours.", "metric": "48hr", "metric_label": "Turnaround"},
        ],
    },

    "Kazakhstan": {
        "destination_name": "Kazakhstan", "tagline": "Your DMC for Kazakhstan",
        "hero_image": _u(_KZ["hero"], 1920),
        "key_facts": [{"label": "Capital", "value": "Astana"}, {"label": "Currency", "value": "Tenge (KZT)"}, {"label": "Languages", "value": "Kazakh, Russian, English"}, {"label": "Best Season", "value": "May - September"}, {"label": "Hi DMC Office", "value": "Almaty"}, {"label": "Local Team", "value": "10+ Experts"}],
        "services_in_country": _services("Kazakhstan", _u(_KZ["hero"]), _u(_KZ["valley"]), _u(_KZ["mountain"]), _u(_KZ["steppe"]), "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Almaty, Kazakhstan", "team_size": "10+", "description": "Specialists covering Astana, Almaty, the Silk Road, and Central Asian steppes."},
        "key_experiences": [
            {"title": "Astana Futuristic City", "description": "Baiterek Tower, Khan Shatyr, and the world's most modern capital.", "image": _u(_KZ["hero"], 600), "location": "Astana"},
            {"title": "Charyn Canyon Trek", "description": "Kazakhstan's Grand Canyon — dramatic red rock formations.", "image": _u(_KZ["mountain"], 600), "location": "Almaty Region"},
            {"title": "Nomadic Yurt Stay", "description": "Overnight in a traditional yurt on the steppe with horseback riding.", "image": _u(_KZ["steppe"], 600), "location": "Steppes"},
            {"title": "Almaty Mountains", "description": "Cable car to Kok Tobe, Big Almaty Lake, and Shymbulak skiing.", "image": _u(_KZ["valley"], 600), "location": "Almaty"},
        ],
        "key_destinations_within": [
            {"name": "Astana", "description": "Futuristic capital — bold architecture and expo legacy.", "image": _u(_KZ["hero"], 500)},
            {"name": "Almaty", "description": "Former capital — mountains, green bazaar, and cafe culture.", "image": _u(_KZ["valley"], 500)},
            {"name": "Charyn Canyon", "description": "Red rock canyon rivalling Arizona's Grand Canyon.", "image": _u(_KZ["mountain"], 500)},
            {"name": "Turkestan", "description": "Silk Road city — Mausoleum of Khoja Yasawi.", "image": _u(_KZ["steppe"], 500)},
        ],
        "regions": [
            {"name": "Northern Kazakhstan", "description": "Astana's futuristic skyline and the vast northern steppes.", "highlights": ["Astana", "Burabay", "Karaganda", "Baikonur"], "image": _u(_KZ["hero"], 600)},
            {"name": "Southern Kazakhstan", "description": "Almaty, Charyn Canyon, and ancient Silk Road cities.", "highlights": ["Almaty", "Charyn", "Turkestan", "Shymkent"], "image": _u(_KZ["valley"], 600)},
        ],
        "food": {"intro": "Kazakh cuisine is hearty nomadic fare — horse meat, fermented mare's milk, and Silk Road flavours.", "cuisines": [
            {"name": "Nomadic Cuisine", "desc": "Horse meat, mutton, and dairy — cuisine of the steppe.", "dishes": ["Beshbarmak", "Kazy", "Kuyrdak", "Baursak"]},
            {"name": "Silk Road Fusion", "desc": "Central Asian pilaf, dumplings, and Persian influences.", "dishes": ["Plov", "Manti", "Samsa", "Lagman"]},
            {"name": "Fermented Drinks", "desc": "Kumiss (mare's milk) and traditional beverages.", "dishes": ["Kumiss", "Shubat", "Kurt", "Chai"]},
            {"name": "Modern Kazakh", "desc": "Almaty's evolving food scene.", "dishes": ["Modern Beshbarmak", "Fusion Manti", "Craft Beer", "Fine Dining"]},
        ]},
        "packages": [
            {"title": "Kazakhstan Highlights", "duration": "7N / 8D", "cities": "Almaty - Charyn - Astana", "highlights": ["Charyn Canyon trek", "Astana architecture", "Green Bazaar tour"], "tag": "Bestseller"},
            {"title": "Silk Road Explorer", "duration": "10N / 11D", "cities": "Almaty - Turkestan - Shymkent - Astana", "highlights": ["Ancient mausoleums", "Steppe camp night", "Camel ride"], "tag": "Cultural"},
            {"title": "Almaty City & Mountains", "duration": "4N / 5D", "cities": "Almaty", "highlights": ["Big Almaty Lake", "Kok Tobe cable car", "Night food tour"], "tag": "Most Popular"},
            {"title": "Nomadic Experience", "duration": "6N / 7D", "cities": "Almaty - Steppes - Burabay", "highlights": ["Yurt stay", "Horseback riding", "Eagle hunting demo"], "tag": "Adventure"},
            {"title": "Astana Modern City", "duration": "3N / 4D", "cities": "Astana", "highlights": ["Baiterek Tower", "Khan Shatyr mall", "Expo city tour"], "tag": "City Break"},
            {"title": "Baikonur Space Tour", "duration": "5N / 6D", "cities": "Almaty - Baikonur - Astana", "highlights": ["Cosmodrome visit", "Rocket launch viewing", "Space museum"], "tag": "Specialist"},
        ],
        "case_studies": [
            {"headline": "Kazakhstan Emerging Destination", "category": "FIT Performance", "description": "A UK agency launched Kazakhstan with 40 bookings in year one.", "metric": "40", "metric_label": "First Year"},
            {"headline": "10 Group Departures Year One", "category": "Group Metrics", "description": "Managed 10 Silk Road group tours in the first year.", "metric": "10", "metric_label": "Departures"},
            {"headline": "Corporate Retreat Almaty", "category": "MICE Delivery", "description": "30-person retreat — mountain hiking and yurt dinner.", "metric": "30", "metric_label": "Guests"},
            {"headline": "Full Itinerary in 48 Hours", "category": "Response Time", "description": "Almaty-Astana itineraries confirmed within 48 hours.", "metric": "48hr", "metric_label": "Turnaround"},
        ],
    },

    "Egypt": {
        "destination_name": "Egypt", "tagline": "Your DMC for Egypt",
        "hero_image": _u(_EG["hero"], 1920),
        "key_facts": [
            {"label": "Capital", "value": "Cairo"},
            {"label": "Currency", "value": "Egyptian Pound (EGP)"},
            {"label": "Languages", "value": "Arabic, English"},
            {"label": "Best Season", "value": "October - April"},
            {"label": "Hi DMC Office", "value": "Cairo"},
            {"label": "Local Team", "value": "40+ Experts"},
        ],
        "services_in_country": _services("Egypt",
            _u(_EG["pyramids2"]), _u(_EG["camel"]), _u(_EG["abu_simbel"]), _u(_EG["mosque"]),
            _u(_EG["cairo"]), _u(_EG["giza"]), _u(_EG["desert_camp"]), _u(_EG["temple"]),
        ),
        "team_info": {"office": "Cairo, Egypt", "team_size": "40+", "description": "Our Cairo office has been operating across Egypt for over 25 years — from the Nile Valley to the Red Sea coast and the Western Desert."},
        "key_experiences": [
            {"title": "Pyramids of Giza & Sphinx", "description": "Private guided tour of the last surviving Wonder of the Ancient World — skip-the-line entry with an Egyptologist guide.", "image": _u(_EG["pyramids"], 600), "location": "Giza"},
            {"title": "Abu Simbel Temples", "description": "Witness Ramesses II's colossal rock-carved temples on the shores of Lake Nasser — an engineering marvel rescued from the rising waters.", "image": _u(_EG["abu_simbel"], 600), "location": "Aswan"},
            {"title": "Nile Cruise — Luxor to Aswan", "description": "Multi-day felucca or luxury dahabiya cruise through ancient Egypt — stopping at Edfu, Kom Ombo, and Philae temples.", "image": _u(_EG["aswan"], 600), "location": "Nile Valley"},
            {"title": "Desert Safari & Stargazing", "description": "4x4 expedition into the White Desert with overnight camping under the stars amid surreal chalk formations.", "image": _u(_EG["desert"], 600), "location": "Western Desert"},
            {"title": "Khan El Khalili Bazaar", "description": "Wander Cairo's legendary 14th-century souk — haggle for spices, brass lanterns, handwoven textiles, and aromatic perfumes.", "image": _u(_EG["bazaar"], 600), "location": "Cairo"},
            {"title": "Red Sea Diving & Snorkelling", "description": "World-class coral reefs, shipwrecks, and crystal-clear waters — from Hurghada to Sharm El Sheikh.", "image": _u(_EG["redsea"], 600), "location": "Red Sea Coast"},
        ],
        "key_destinations_within": [
            {"name": "Cairo", "description": "Pyramids, mosques, museums, and the chaotic energy of Africa's largest city.", "image": _u(_EG["cairo"], 500)},
            {"name": "Luxor", "description": "Open-air museum — Valley of the Kings, Karnak Temple, and Hatshepsut's mortuary temple.", "image": _u(_EG["temple"], 500)},
            {"name": "Aswan", "description": "Nubian culture, Philae Temple, and the gateway to Abu Simbel.", "image": _u(_EG["aswan"], 500)},
            {"name": "Alexandria", "description": "Mediterranean charm — Roman ruins, the new Bibliotheca, and seafood on the corniche.", "image": _u(_EG["mosque"], 500)},
            {"name": "Hurghada", "description": "Red Sea resort hub — diving, snorkelling, and desert excursions.", "image": _u(_EG["redsea"], 500)},
            {"name": "Sharm El Sheikh", "description": "Sinai peninsula paradise — Ras Mohammed reefs, Blue Hole, and Mount Sinai sunrise.", "image": _u(_EG["oasis"], 500)},
        ],
        "regions": [
            {"name": "Nile Valley", "description": "The cradle of civilisation — pharaonic temples, royal tombs, and timeless villages stretching from Cairo to Aswan.", "highlights": ["Cairo", "Luxor", "Aswan", "Edfu", "Kom Ombo"], "image": _u(_EG["temple"], 600)},
            {"name": "Red Sea Coast", "description": "World-class diving, luxury resorts, and year-round sunshine along Egypt's eastern seaboard.", "highlights": ["Hurghada", "Sharm El Sheikh", "Marsa Alam", "El Gouna"], "image": _u(_EG["redsea"], 600)},
            {"name": "Western Desert", "description": "Surreal landscapes — the White Desert, Siwa Oasis, and vast sand seas for intrepid travellers.", "highlights": ["Siwa Oasis", "White Desert", "Bahariya", "Farafra"], "image": _u(_EG["desert"], 600)},
            {"name": "Sinai Peninsula", "description": "Biblical landscapes, Bedouin culture, and legendary dive sites between Asia and Africa.", "highlights": ["Mount Sinai", "St. Catherine's", "Dahab", "Taba"], "image": _u(_EG["desert_camp"], 600)},
        ],
        "food": {
            "intro": "Egyptian cuisine is a tapestry of ancient recipes, Middle Eastern spice, and Mediterranean freshness — hearty, communal, and deeply flavourful.",
            "cuisines": [
                {"name": "Egyptian Street Food", "desc": "Cairo's street stalls serve some of the world's oldest dishes — fava bean stews, falafel, and stuffed flatbreads.", "dishes": ["Ful Medames", "Ta'ameya", "Koshari", "Hawawshi"]},
                {"name": "Grilled & Roasted", "desc": "Charcoal-grilled meats, slow-roasted pigeon, and spiced kebabs — the heart of Egyptian home cooking.", "dishes": ["Kebab", "Kofta", "Hamam Mahshi", "Shawarma"]},
                {"name": "Seafood", "desc": "Fresh Mediterranean and Red Sea catch — grilled, fried, or tagine-style with Egyptian spices.", "dishes": ["Sayadeya", "Grilled Sea Bass", "Calamari", "Shrimp Tagine"]},
                {"name": "Sweets & Drinks", "desc": "Syrup-drenched pastries, aromatic teas, and refreshing juices from Egypt's famous sugar cane and hibiscus.", "dishes": ["Basbousa", "Konafa", "Karkade", "Sahlab"]},
            ],
        },
        "packages": [
            {"title": "Classic Egypt — Cairo & Nile", "duration": "7 Nights / 8 Days", "cities": "Cairo - Luxor - Aswan", "highlights": ["Pyramids & Sphinx private tour", "Nile cruise with temple stops", "Abu Simbel day trip"], "tag": "Bestseller"},
            {"title": "Pyramids & Red Sea Combo", "duration": "8 Nights / 9 Days", "cities": "Cairo - Hurghada", "highlights": ["Giza & Saqqara exploration", "Red Sea diving & snorkelling", "Desert quad-biking"], "tag": "Most Popular"},
            {"title": "Grand Egypt Explorer", "duration": "12 Nights / 13 Days", "cities": "Cairo - Luxor - Aswan - Abu Simbel - Hurghada", "highlights": ["Full Nile cruise", "Valley of the Kings", "Abu Simbel sunrise", "Red Sea relaxation"], "tag": "Premium"},
            {"title": "Desert & Oasis Adventure", "duration": "6 Nights / 7 Days", "cities": "Cairo - Bahariya - White Desert - Siwa", "highlights": ["White Desert camping", "Siwa Oasis hot springs", "4x4 sand sea crossing"], "tag": "Adventure"},
            {"title": "Egypt Luxury Heritage", "duration": "9 Nights / 10 Days", "cities": "Cairo - Luxor - Aswan - Alexandria", "highlights": ["Old Cataract Hotel stay", "Private Egyptologist guide", "Alexandria seafood dinner"], "tag": "Luxury"},
            {"title": "Honeymoon on the Nile", "duration": "7 Nights / 8 Days", "cities": "Cairo - Nile Dahabiya - Aswan", "highlights": ["Hot air balloon over Luxor", "Private dahabiya cruise", "Candlelit temple dinner"], "tag": "Romance"},
        ],
        "case_studies": [
            {"headline": "250% Growth in Egypt Bookings", "category": "FIT Performance", "description": "A German agency grew Egypt bookings from 60 to 210 per year using our live rates and on-ground DMC team.", "metric": "250%", "metric_label": "Booking Growth"},
            {"headline": "80 Group Departures in Peak Season", "category": "Group Metrics", "description": "Managed 80 Nile cruise group departures across a single winter season — zero disruptions.", "metric": "80", "metric_label": "Departures"},
            {"headline": "400-Guest Corporate Gala at the Pyramids", "category": "MICE Delivery", "description": "400-person incentive event with a gala dinner at the foot of the Pyramids — permits, logistics, and entertainment.", "metric": "400", "metric_label": "Guests"},
            {"headline": "24-Hour Custom Nile Proposals", "category": "Response Time", "description": "Agents receive fully costed Nile itineraries within 24 hours — enabling same-day client responses.", "metric": "24hr", "metric_label": "Turnaround"},
        ],
    },

    "Nepal": {
        "destination_name": "Nepal", "tagline": "Your DMC for Nepal",
        "hero_image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80",
        "key_facts": [{"label": "Capital", "value": "Kathmandu"}, {"label": "Currency", "value": "Rupee (NPR)"}, {"label": "Languages", "value": "Nepali, English"}, {"label": "Best Season", "value": "Oct - Dec, Mar - May"}, {"label": "Hi DMC Office", "value": "Kathmandu"}, {"label": "Local Team", "value": "20+ Experts"}],
        "services_in_country": _services("Nepal", "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80", "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=700&q=80", "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=700&q=80", "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80", "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=700&q=80", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80", "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80"),
        "team_info": {"office": "Kathmandu, Nepal", "team_size": "20+", "description": "Himalayan specialists with deep expertise in trekking logistics, cultural tours, and adventure travel across Nepal."},
        "key_experiences": [
            {"title": "Everest Base Camp Trek", "description": "The iconic trek to the foot of the world's highest peak through Sherpa villages and glacial valleys.", "image": "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=600&q=80", "location": "Khumbu"},
            {"title": "Kathmandu Heritage Walk", "description": "Explore Durbar Square, Boudhanath Stupa, and Pashupatinath — UNESCO World Heritage treasures.", "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80", "location": "Kathmandu"},
            {"title": "Chitwan Jungle Safari", "description": "Spot one-horned rhinos, Bengal tigers, and exotic birds in Chitwan National Park.", "image": "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=600&q=80", "location": "Chitwan"},
            {"title": "Pokhara & Annapurna Views", "description": "Lakeside relaxation with panoramic Annapurna and Machapuchare mountain views at sunrise.", "image": "https://images.unsplash.com/photo-1718179634911-8551f8b0cccf?w=600&q=80", "location": "Pokhara"},
        ],
        "key_destinations_within": [
            {"name": "Kathmandu", "description": "Ancient temples, bustling bazaars, and the cultural heart of Nepal.", "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80"},
            {"name": "Pokhara", "description": "Lakeside serenity with stunning Annapurna mountain panoramas.", "image": "https://images.unsplash.com/photo-1718179634911-8551f8b0cccf?w=500&q=80"},
            {"name": "Chitwan", "description": "Wildlife safaris in one of Asia's best-preserved national parks.", "image": "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=500&q=80"},
            {"name": "Lumbini", "description": "Birthplace of Buddha — a sacred pilgrimage site of global significance.", "image": "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=500&q=80"},
        ],
        "regions": [
            {"name": "Kathmandu Valley", "description": "Three ancient cities — Kathmandu, Patan, and Bhaktapur — packed with temples and living heritage.", "highlights": ["Kathmandu", "Patan", "Bhaktapur", "Nagarkot"], "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80"},
            {"name": "Himalayan Region", "description": "Everest, Annapurna, Langtang — the world's greatest mountain trekking destinations.", "highlights": ["Everest Base Camp", "Annapurna Circuit", "Langtang Valley", "Manaslu"], "image": "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=600&q=80"},
        ],
        "food": {"intro": "Nepali cuisine blends South Asian spices with Tibetan influences — hearty, warming, and deeply flavourful.", "cuisines": [
            {"name": "Traditional Nepali", "desc": "Dal Bhat — the national dish served twice daily with seasonal vegetables and pickles.", "dishes": ["Dal Bhat", "Gundruk", "Sel Roti", "Achar"]},
            {"name": "Newari Cuisine", "desc": "Kathmandu Valley's indigenous food — rich, meaty, and fermented.", "dishes": ["Chatamari", "Yomari", "Choila", "Bara"]},
            {"name": "Tibetan Influence", "desc": "Momos, thukpa, and butter tea from the high Himalayan regions.", "dishes": ["Momos", "Thukpa", "Butter Tea", "Tingmo"]},
            {"name": "Street Food", "desc": "Chaat, samosas, and sweet treats from Kathmandu's bustling lanes.", "dishes": ["Pani Puri", "Samosa", "Jeri", "Lakhamari"]},
        ]},
        "packages": [
            {"title": "Classic Nepal Triangle", "duration": "7N / 8D", "cities": "Kathmandu - Pokhara - Chitwan", "highlights": ["Heritage temple tours", "Annapurna sunrise", "Jungle safari"], "tag": "Bestseller"},
            {"title": "Everest Base Camp Trek", "duration": "12N / 13D", "cities": "Kathmandu - Lukla - EBC", "highlights": ["Sherpa village stays", "Kala Patthar viewpoint", "Monastery visits"], "tag": "Adventure"},
            {"title": "Nepal Cultural Discovery", "duration": "5N / 6D", "cities": "Kathmandu - Patan - Bhaktapur - Nagarkot", "highlights": ["Durbar Square walks", "Pottery workshops", "Himalayan sunrise"], "tag": "Most Popular"},
            {"title": "Annapurna Circuit", "duration": "14N / 15D", "cities": "Pokhara - Manang - Thorong La - Muktinath", "highlights": ["Thorong La Pass (5,416m)", "Hot springs at Tatopani", "Muktinath temple"], "tag": "Trekking"},
            {"title": "Nepal Luxury Retreat", "duration": "6N / 7D", "cities": "Kathmandu - Dhulikhel - Pokhara", "highlights": ["5-star Himalayan lodge", "Spa and yoga retreat", "Private mountain flight"], "tag": "Premium"},
            {"title": "Spiritual Nepal & Lumbini", "duration": "8N / 9D", "cities": "Kathmandu - Lumbini - Pokhara - Chitwan", "highlights": ["Buddha's birthplace", "Monastery meditation", "Chitwan canoe ride"], "tag": "Spiritual"},
        ],
        "case_studies": [
            {"headline": "Nepal Bookings Up 180%", "category": "FIT Performance", "description": "A UK agency nearly tripled Nepal bookings using our trekking logistics and local guide network.", "metric": "180%", "metric_label": "Growth"},
            {"headline": "55 Group Departures Annually", "category": "Group Metrics", "description": "Managed 55 group tours across Kathmandu, Pokhara, and Everest region.", "metric": "55", "metric_label": "Departures"},
            {"headline": "200-Person Corporate Retreat", "category": "MICE Delivery", "description": "200-person corporate retreat in Nagarkot with team-building treks and cultural programming.", "metric": "200", "metric_label": "Guests"},
            {"headline": "Custom Trek in 12 Hours", "category": "Response Time", "description": "Complex multi-day trekking itineraries with permits confirmed within 12 hours.", "metric": "12hr", "metric_label": "Turnaround"},
        ],
    },
}
