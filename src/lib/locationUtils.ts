import { Establishment } from '@/types/establishment'

// Mapping of cities to counties and countries for better SEO organization
export const cityToCounty: Record<string, { county: string; country: string }> = {
  // England
  'London': { county: 'Greater London', country: 'England' },
  'Manchester': { county: 'Greater Manchester', country: 'England' },
  'Birmingham': { county: 'West Midlands', country: 'England' },
  'Liverpool': { county: 'Merseyside', country: 'England' },
  'Leeds': { county: 'West Yorkshire', country: 'England' },
  'Sheffield': { county: 'South Yorkshire', country: 'England' },
  'Bristol': { county: 'Gloucestershire', country: 'England' },
  'Newcastle': { county: 'Tyne and Wear', country: 'England' },
  'Brighton': { county: 'East Sussex', country: 'England' },
  'Portsmouth': { county: 'Hampshire', country: 'England' },
  'Southampton': { county: 'Hampshire', country: 'England' },
  'Southsea': { county: 'Hampshire', country: 'England' },

  // Cumbria
  'Cockermouth': { county: 'Cumbria', country: 'England' },
  'Workington': { county: 'Cumbria', country: 'England' },
  'Keswick': { county: 'Cumbria', country: 'England' },
  'Kendal': { county: 'Cumbria', country: 'England' },
  'Ambleside': { county: 'Cumbria', country: 'England' },
  'Coniston': { county: 'Cumbria', country: 'England' },
  'Grange-over-Sands': { county: 'Cumbria', country: 'England' },
  'Ulverston': { county: 'Cumbria', country: 'England' },

  // Lancashire
  'Carnforth': { county: 'Lancashire', country: 'England' },
  'Preston': { county: 'Lancashire', country: 'England' },
  'Blackpool': { county: 'Lancashire', country: 'England' },
  'Leyland': { county: 'Lancashire', country: 'England' },
  'Poulton-le-Fylde': { county: 'Lancashire', country: 'England' },
  'Lytham Saint Annes': { county: 'Lancashire', country: 'England' },
  'Chorley': { county: 'Lancashire', country: 'England' },
  'Lancaster': { county: 'Lancashire', country: 'England' },

  // Cheshire
  'Sandbach': { county: 'Cheshire', country: 'England' },

  // Yorkshire
  'Holmfirth': { county: 'West Yorkshire', country: 'England' },
  'York': { county: 'North Yorkshire', country: 'England' },

  // Norfolk
  'Southminster': { county: 'Norfolk', country: 'England' },
  'Norwich': { county: 'Norfolk', country: 'England' },

  // Suffolk
  'Stowmarket': { county: 'Suffolk', country: 'England' },
  'Aldeburgh': { county: 'Suffolk', country: 'England' },
  'Sudbury': { county: 'Suffolk', country: 'England' },

  // Essex
  'Chelmsford': { county: 'Essex', country: 'England' },
  'Clacton-on-Sea': { county: 'Essex', country: 'England' },

  // Kent
  'Canterbury': { county: 'Kent', country: 'England' },
  'Ashford': { county: 'Kent', country: 'England' },
  'Broadstairs': { county: 'Kent', country: 'England' },
  'Herne Bay': { county: 'Kent', country: 'England' },
  'Ramsgate': { county: 'Kent', country: 'England' },
  'Birchington': { county: 'Kent', country: 'England' },
  'Chatham': { county: 'Kent', country: 'England' },
  'Deal': { county: 'Kent', country: 'England' },
  'Folkestone': { county: 'Kent', country: 'England' },
  'Gillingham': { county: 'Kent', country: 'England' },
  'Hythe': { county: 'Kent', country: 'England' },
  'Maidstone': { county: 'Kent', country: 'England' },
  'Margate': { county: 'Kent', country: 'England' },
  'Tonbridge': { county: 'Kent', country: 'England' },
  'Whitstable': { county: 'Kent', country: 'England' },

  // Surrey
  'Dorking': { county: 'Surrey', country: 'England' },
  'Godstone': { county: 'Surrey', country: 'England' },
  'Farnham': { county: 'Surrey', country: 'England' },
  'Great Loxhill': { county: 'Surrey', country: 'England' },
  'Haslemere': { county: 'Surrey', country: 'England' },
  'Sutton': { county: 'Surrey', country: 'England' },

  // West Sussex
  'Chichester': { county: 'West Sussex', country: 'England' },

  // East Sussex
  'Eastleigh': { county: 'Hampshire', country: 'England' },

  // Hampshire
  'Fareham': { county: 'Hampshire', country: 'England' },
  'Waterlooville': { county: 'Hampshire', country: 'England' },
  'Andover': { county: 'Hampshire', country: 'England' },
  'Alresford': { county: 'Hampshire', country: 'England' },
  'Winchester': { county: 'Hampshire', country: 'England' },
  'Brockenhurst': { county: 'Hampshire', country: 'England' },
  'Stockbridge': { county: 'Hampshire', country: 'England' },
  'Alton': { county: 'Hampshire', country: 'England' },
  'Bordon': { county: 'Hampshire', country: 'England' },
  'Gosport': { county: 'Hampshire', country: 'England' },
  'Lymington': { county: 'Hampshire', country: 'England' },

  // Berkshire
  'Newbury': { county: 'Berkshire', country: 'England' },
  'Hungerford': { county: 'Berkshire', country: 'England' },

  // Oxfordshire
  'Abingdon': { county: 'Oxfordshire', country: 'England' },
  'Wantage': { county: 'Oxfordshire', country: 'England' },

  // Gloucestershire
  'Cirencester': { county: 'Gloucestershire', country: 'England' },
  'Dursley': { county: 'Gloucestershire', country: 'England' },
  'Stroud': { county: 'Gloucestershire', country: 'England' },
  'Tetbury': { county: 'Gloucestershire', country: 'England' },
  'Wotton-under-Edge': { county: 'Gloucestershire', country: 'England' },
  'Chipping Campden': { county: 'Gloucestershire', country: 'England' },

  // Wiltshire
  'Marlborough': { county: 'Wiltshire', country: 'England' },
  'Chippenham': { county: 'Wiltshire', country: 'England' },
  'Devizes': { county: 'Wiltshire', country: 'England' },
  'Warminster': { county: 'Wiltshire', country: 'England' },
  'Trowbridge': { county: 'Wiltshire', country: 'England' },
  'Melksham': { county: 'Wiltshire', country: 'England' },
  'Bradford-on-Avon': { county: 'Wiltshire', country: 'England' },
  'Salisbury': { county: 'Wiltshire', country: 'England' },
  'Pewsey': { county: 'Wiltshire', country: 'England' },
  'Malmesbury': { county: 'Wiltshire', country: 'England' },
  'Swindon': { county: 'Wiltshire', country: 'England' },
  'Westbury': { county: 'Wiltshire', country: 'England' },
  'Calne': { county: 'Wiltshire', country: 'England' },

  // Somerset
  'Bath': { county: 'Somerset', country: 'England' },
  'Bridgwater': { county: 'Somerset', country: 'England' },
  'Highbridge': { county: 'Somerset', country: 'England' },
  'Wells': { county: 'Somerset', country: 'England' },
  'Axbridge': { county: 'Somerset', country: 'England' },
  'Frome': { county: 'Somerset', country: 'England' },
  'Radstock': { county: 'Somerset', country: 'England' },
  'Shepton Mallet': { county: 'Somerset', country: 'England' },
  'Glastonbury': { county: 'Somerset', country: 'England' },
  'Somerton': { county: 'Somerset', country: 'England' },
  'Langport': { county: 'Somerset', country: 'England' },
  'Castle Cary': { county: 'Somerset', country: 'England' },
  'Weston-super-Mare': { county: 'Somerset', country: 'England' },
  'Cheddar': { county: 'Somerset', country: 'England' },
  'Clevedon': { county: 'Somerset', country: 'England' },
  'Corston': { county: 'Somerset', country: 'England' },

  // Devon
  'Exeter': { county: 'Devon', country: 'England' },
  'Plymouth': { county: 'Devon', country: 'England' },
  'Torquay': { county: 'Devon', country: 'England' },
  'Totnes': { county: 'Devon', country: 'England' },
  'Dartmouth': { county: 'Devon', country: 'England' },
  'Ivybridge': { county: 'Devon', country: 'England' },
  'Newton Abbot': { county: 'Devon', country: 'England' },
  'Exmouth': { county: 'Devon', country: 'England' },
  'Honiton': { county: 'Devon', country: 'England' },
  'Okehampton': { county: 'Devon', country: 'England' },
  'Barnstaple': { county: 'Devon', country: 'England' },
  'Bideford': { county: 'Devon', country: 'England' },
  'Budleigh Salterton': { county: 'Devon', country: 'England' },
  'Kingsbridge': { county: 'Devon', country: 'England' },
  'Brixham': { county: 'Devon', country: 'England' },
  'Salcombe': { county: 'Devon', country: 'England' },
  'Teignmouth': { county: 'Devon', country: 'England' },
  'Kingsbridge, Devon': { county: 'Devon', country: 'England' },

  // Cornwall
  'Truro': { county: 'Cornwall', country: 'England' },
  'Penzance': { county: 'Cornwall', country: 'England' },
  'Newquay': { county: 'Cornwall', country: 'England' },
  'Bodmin': { county: 'Cornwall', country: 'England' },
  'Launceston': { county: 'Cornwall', country: 'England' },
  'Saint Austell': { county: 'Cornwall', country: 'England' },
  'Saint Ives': { county: 'Cornwall', country: 'England' },
  'Saint Columb': { county: 'Cornwall', country: 'England' },
  'Saint Agnes': { county: 'Cornwall', country: 'England' },
  'Hayle': { county: 'Cornwall', country: 'England' },
  'Helston': { county: 'Cornwall', country: 'England' },
  'Lostwithiel': { county: 'Cornwall', country: 'England' },
  'Wadebridge': { county: 'Cornwall', country: 'England' },
  'Bude': { county: 'Cornwall', country: 'England' },
  'Liskeard': { county: 'Cornwall', country: 'England' },
  'Padstow': { county: 'Cornwall', country: 'England' },
  'Penryn': { county: 'Cornwall', country: 'England' },
  'Perranporth': { county: 'Cornwall', country: 'England' },
  'Redruth': { county: 'Cornwall', country: 'England' },

  // Dorset
  'Dorchester': { county: 'Dorset', country: 'England' },
  'Poole': { county: 'Dorset', country: 'England' },
  'Weymouth': { county: 'Dorset', country: 'England' },
  'Bridport': { county: 'Dorset', country: 'England' },
  'Wimborne': { county: 'Dorset', country: 'England' },
  'Bournemouth': { county: 'Dorset', country: 'England' },
  'Christchurch': { county: 'Dorset', country: 'England' },

  // Hertfordshire
  'Ware': { county: 'Hertfordshire', country: 'England' },
  'Bishop\'s Stortford': { county: 'Hertfordshire', country: 'England' },

  // Bedfordshire
  'Bedford': { county: 'Bedfordshire', country: 'England' },

  // Buckinghamshire
  'Buckingham': { county: 'Buckinghamshire', country: 'England' },

  // Northamptonshire
  'Northampton': { county: 'Northamptonshire', country: 'England' },

  // Leicestershire
  'Melton Mowbray': { county: 'Leicestershire', country: 'England' },
  'Market Harborough': { county: 'Leicestershire', country: 'England' },

  // Rutland
  'Stamford': { county: 'Rutland', country: 'England' },

  // Lincolnshire
  'Grantham': { county: 'Lincolnshire', country: 'England' },

  // Warwickshire
  'Coventry': { county: 'Warwickshire', country: 'England' },
  'Stratford-upon-Avon': { county: 'Warwickshire', country: 'England' },
  'Rugby': { county: 'Warwickshire', country: 'England' },

  // Worcestershire
  'Worcester': { county: 'Worcestershire', country: 'England' },
  'Bewdley': { county: 'Worcestershire', country: 'England' },
  'Kidderminster': { county: 'Worcestershire', country: 'England' },
  'Malvern': { county: 'Worcestershire', country: 'England' },
  'Bromsgrove': { county: 'Worcestershire', country: 'England' },
  'Tenbury Wells': { county: 'Worcestershire', country: 'England' },

  // Herefordshire
  'Hereford': { county: 'Herefordshire', country: 'England' },
  'Kington': { county: 'Herefordshire', country: 'England' },
  'Bromyard': { county: 'Herefordshire', country: 'England' },

  // Shropshire
  'Shrewsbury': { county: 'Shropshire', country: 'England' },
  'Telford': { county: 'Shropshire', country: 'England' },
  'Ludlow': { county: 'Shropshire', country: 'England' },
  'Bridgnorth': { county: 'Shropshire', country: 'England' },
  'Much Wenlock': { county: 'Shropshire', country: 'England' },
  'Bishops Castle': { county: 'Shropshire', country: 'England' },
  'Craven Arms': { county: 'Shropshire', country: 'England' },
  'Ellesmere': { county: 'Shropshire', country: 'England' },
  'Whitchurch': { county: 'Shropshire', country: 'England' },
  'Oswestry': { county: 'Shropshire', country: 'England' },

  // Staffordshire
  'Tamworth': { county: 'Staffordshire', country: 'England' },
  'Swadlincote': { county: 'Staffordshire', country: 'England' },

  // Derbyshire
  'Alfreton': { county: 'Derbyshire', country: 'England' },

  // West Midlands
  'Wolverhampton': { county: 'West Midlands', country: 'England' },
  'Stourbridge': { county: 'West Midlands', country: 'England' },
  'Brierley Hill': { county: 'West Midlands', country: 'England' },
  'Kingswinford': { county: 'West Midlands', country: 'England' },
  'Stourport-on-Severn': { county: 'Worcestershire', country: 'England' },

  // Isles of Scilly
  'Isles of Scilly': { county: 'Isles of Scilly', country: 'England' },
  'St Mary\'s': { county: 'Isles of Scilly', country: 'England' },

  // Isle of Wight
  'Sandown': { county: 'Isle of Wight', country: 'England' },

  // Scotland
  'Glasgow': { county: 'Lanarkshire', country: 'Scotland' },
  'Edinburgh': { county: 'Midlothian', country: 'Scotland' },
  'Aberdeen': { county: 'Aberdeenshire', country: 'Scotland' },
  'Dundee': { county: 'Angus', country: 'Scotland' },
  'Stirling': { county: 'Stirlingshire', country: 'Scotland' },
  'Falkirk': { county: 'Stirlingshire', country: 'Scotland' },
  'Castle Douglas': { county: 'Dumfries and Galloway', country: 'Scotland' },

  // Highland
  'Inverness': { county: 'Highland', country: 'Scotland' },
  'Fort William': { county: 'Highland', country: 'Scotland' },
  'Dingwall': { county: 'Highland', country: 'Scotland' },
  'Thurso': { county: 'Highland', country: 'Scotland' },
  'Wick': { county: 'Highland', country: 'Scotland' },
  'Dornoch': { county: 'Highland', country: 'Scotland' },
  'Tain': { county: 'Highland', country: 'Scotland' },
  'Cromarty': { county: 'Highland', country: 'Scotland' },
  'Invergordon': { county: 'Highland', country: 'Scotland' },
  'Alness': { county: 'Highland', country: 'Scotland' },
  'Nairn': { county: 'Highland', country: 'Scotland' },
  'Forres': { county: 'Highland', country: 'Scotland' },
  'Grantown-on-Spey': { county: 'Highland', country: 'Scotland' },
  'Aviemore': { county: 'Highland', country: 'Scotland' },
  'Kingussie': { county: 'Highland', country: 'Scotland' },
  'Spean Bridge': { county: 'Highland', country: 'Scotland' },
  'Mallaig': { county: 'Highland', country: 'Scotland' },
  'Kyle': { county: 'Highland', country: 'Scotland' },
  'Plockton': { county: 'Highland', country: 'Scotland' },
  'Portree': { county: 'Highland', country: 'Scotland' },
  'Muir of Ord': { county: 'Highland', country: 'Scotland' },
  'Munlochy': { county: 'Highland', country: 'Scotland' },
  'Gairloch': { county: 'Highland', country: 'Scotland' },
  'Kinlochleven': { county: 'Highland', country: 'Scotland' },
  'Achnasheen': { county: 'Highland', country: 'Scotland' },
  'Acharacle': { county: 'Highland', country: 'Scotland' },
  'Garve': { county: 'Highland', country: 'Scotland' },
  'Morvern': { county: 'Highland', country: 'Scotland' },
  'Strathcarron': { county: 'Highland', country: 'Scotland' },

  // Aberdeenshire
  'Huntly': { county: 'Aberdeenshire', country: 'Scotland' },
  'Inverurie': { county: 'Aberdeenshire', country: 'Scotland' },
  'Ballindalloch': { county: 'Aberdeenshire', country: 'Scotland' },
  'Keith': { county: 'Aberdeenshire', country: 'Scotland' },
  'Banff': { county: 'Aberdeenshire', country: 'Scotland' },

  // Moray
  'Elgin': { county: 'Moray', country: 'Scotland' },
  'Buckie': { county: 'Moray', country: 'Scotland' },
  'Aberlour': { county: 'Moray', country: 'Scotland' },

  // Fife
  'Dunfermline': { county: 'Fife', country: 'Scotland' },
  'Charlestown': { county: 'Fife', country: 'Scotland' },

  // Angus
  'Arbroath': { county: 'Angus', country: 'Scotland' },

  // Perthshire
  'Perth': { county: 'Perthshire', country: 'Scotland' },
  'Aberfeldy': { county: 'Perthshire', country: 'Scotland' },
  'Doune': { county: 'Perthshire', country: 'Scotland' },

  // Renfrewshire
  'Paisley': { county: 'Renfrewshire', country: 'Scotland' },
  'Greenock': { county: 'Renfrewshire', country: 'Scotland' },

  // Ayrshire
  'Kilmarnock': { county: 'Ayrshire', country: 'Scotland' },
  'Girvan': { county: 'Ayrshire', country: 'Scotland' },
  'Mauchline': { county: 'Ayrshire', country: 'Scotland' },
  'Beith': { county: 'North Ayrshire', country: 'Scotland' },

  // Dumfries and Galloway
  'Dumfries': { county: 'Dumfries and Galloway', country: 'Scotland' },
  'Newton Stewart': { county: 'Dumfries and Galloway', country: 'Scotland' },
  'Annan': { county: 'Dumfries and Galloway', country: 'Scotland' },
  'Kirkcudbright': { county: 'Dumfries and Galloway', country: 'Scotland' },

  // Scottish Borders
  'Galashiels': { county: 'Scottish Borders', country: 'Scotland' },
  'Hawick': { county: 'Scottish Borders', country: 'Scotland' },

  // Dunbartonshire
  'Dumbarton': { county: 'Dunbartonshire', country: 'Scotland' },
  'Clydebank': { county: 'Dunbartonshire', country: 'Scotland' },

  // Lanarkshire
  'Coatbridge': { county: 'Lanarkshire', country: 'Scotland' },
  'Strathaven': { county: 'Lanarkshire', country: 'Scotland' },
  'Linlithgow': { county: 'West Lothian', country: 'Scotland' },

  // Orkney
  'Kirkwall': { county: 'Orkney', country: 'Scotland' },
  'Orkney': { county: 'Orkney', country: 'Scotland' },

  // Western Isles
  'Stornoway': { county: 'Western Isles', country: 'Scotland' },
  'Isle of Benbecula': { county: 'Western Isles', country: 'Scotland' },

  // Island Counties
  'Isle of Arran': { county: 'North Ayrshire', country: 'Scotland' },
  'Isle of Barra': { county: 'Western Isles', country: 'Scotland' },
  'Isle of Bute': { county: 'Argyll and Bute', country: 'Scotland' },
  'Isle of Cumbrae': { county: 'North Ayrshire', country: 'Scotland' },
  'Isle of Eigg': { county: 'Highland', country: 'Scotland' },
  'Isle of Gigha': { county: 'Argyll and Bute', country: 'Scotland' },
  'Isle of Harris': { county: 'Western Isles', country: 'Scotland' },
  'Isle of Islay': { county: 'Argyll and Bute', country: 'Scotland' },
  'Isle of Jura': { county: 'Argyll and Bute', country: 'Scotland' },
  'Isle of Lewis': { county: 'Western Isles', country: 'Scotland' },
  'Isle of Skye': { county: 'Highland', country: 'Scotland' },
  'Isle of Tiree': { county: 'Argyll and Bute', country: 'Scotland' },

  // Argyll and Bute
  'Oban': { county: 'Argyll and Bute', country: 'Scotland' },
  'Campbeltown': { county: 'Argyll and Bute', country: 'Scotland' },
  'Cairndow': { county: 'Argyll and Bute', country: 'Scotland' },

  // Caithness
  'Caithness': { county: 'Highland', country: 'Scotland' },

  // Sutherland
  'Brora': { county: 'Highland', country: 'Scotland' },
  'Shetland': { county: 'Shetland', country: 'Scotland' },

  // Wales
  'Cardiff': { county: 'South Glamorgan', country: 'Wales' },
  'Swansea': { county: 'West Glamorgan', country: 'Wales' },
  'Newport': { county: 'Gwent', country: 'Wales' },

  // Rhondda Cynon Taf
  'Pontyclun': { county: 'Rhondda Cynon Taf', country: 'Wales' },

  // Pembrokeshire
  'Tenby': { county: 'Pembrokeshire', country: 'Wales' },

  // Powys
  'Newtown': { county: 'Powys', country: 'Wales' },
  'Montgomery': { county: 'Powys', country: 'Wales' },

  // Gwynedd
  'Caernarfon': { county: 'Gwynedd', country: 'Wales' },

  // Conwy
  'Llandudno': { county: 'Conwy', country: 'Wales' },
  'Llandudno Junction': { county: 'Conwy', country: 'Wales' },

  // Denbighshire
  'Denbigh': { county: 'Denbighshire', country: 'Wales' },

  // Ceredigion
  'Llaethliw': { county: 'Ceredigion', country: 'Wales' },

  // Blaenau Gwent
  'Abertillery': { county: 'Blaenau Gwent', country: 'Wales' },

  // Torfaen
  'Cwmbran': { county: 'Torfaen', country: 'Wales' },

  // Powys
  'Machynlleth': { county: 'Powys', country: 'Wales' },

  // Gwynedd
  'Llanfairfechan': { county: 'Gwynedd', country: 'Wales' },

  // Anglesey
  'Pentraeth': { county: 'Anglesey', country: 'Wales' },

  // Monmouthshire
  'Chepstow': { county: 'Monmouthshire', country: 'Wales' },
  'Caldicot': { county: 'Monmouthshire', country: 'Wales' },
  'Usk': { county: 'Monmouthshire', country: 'Wales' },
  'Abergavenny': { county: 'Monmouthshire', country: 'Wales' },
  'Presteigne': { county: 'Powys', country: 'Wales' },

  // Northern Ireland
  'Belfast': { county: 'County Antrim', country: 'Northern Ireland' },
  'Lisburn': { county: 'County Antrim', country: 'Northern Ireland' },
  'Newtownards': { county: 'County Down', country: 'Northern Ireland' },
  'Downpatrick': { county: 'County Down', country: 'Northern Ireland' },
  'Newry': { county: 'County Down', country: 'Northern Ireland' },
  'Castlewellan': { county: 'County Down', country: 'Northern Ireland' },
  'Londonderry': { county: 'County Londonderry', country: 'Northern Ireland' },
  'Portrush': { county: 'County Antrim', country: 'Northern Ireland' },
  'Enniskillen': { county: 'County Fermanagh', country: 'Northern Ireland' },
  'Donaghadee': { county: 'County Down', country: 'Northern Ireland' },
}

export function organizeByLocation(establishments: Establishment[]) {
  const organized: Record<string, Record<string, Establishment[]>> = {}

  establishments.forEach(establishment => {
    const locationInfo = cityToCounty[establishment.city]

    // Skip establishments with invalid or missing location data
    if (!locationInfo || !establishment.city ||
        establishment.city === 'Unknown' ||
        establishment.city === 'Farm' ||
        establishment.city === 'on' ||
        establishment.city.trim() === '') {
      return
    }

    const { country, county } = locationInfo

    if (!organized[country]) {
      organized[country] = {}
    }

    if (!organized[country][county]) {
      organized[country][county] = []
    }

    organized[country][county].push(establishment)
  })

  return organized
}

export function getEstablishmentCoordinates(establishment: Establishment): [number, number] | null {
  // In a real implementation, you'd geocode the addresses
  // For now, return approximate coordinates based on major cities
  console.log('Getting coordinates for:', establishment.title, 'in', establishment.city)

  const cityCoords: Record<string, [number, number]> = {
    // Major Cities
    'London': [51.5074, -0.1278],
    'Glasgow': [55.8642, -4.2518],
    'Birmingham': [52.4862, -1.8904],
    'Manchester': [53.4808, -2.2426],
    'Edinburgh': [55.9533, -3.1883],
    'Liverpool': [53.4084, -2.9916],
    'Cardiff': [51.4816, -3.1791],
    'Belfast': [54.5973, -5.9301],
    'Newcastle': [54.9783, -1.6178],
    'Bristol': [51.4545, -2.5879],
    'Leeds': [53.8008, -1.5491],
    'Sheffield': [53.3811, -1.4701],

    // England - Hampshire
    'Southampton': [50.9097, -1.4044],
    'Southsea': [50.7833, -1.0833],
    'Portsmouth': [50.8198, -1.0880],
    'Winchester': [51.0632, -1.3080],
    'Fareham': [50.8552, -1.1865],
    'Waterlooville': [50.8801, -1.0337],
    'Andover': [51.2119, -1.4959],
    'Alresford': [51.0892, -1.1658],
    'Eastleigh': [50.9697, -1.3488],

    // England - Cumbria
    'Cockermouth': [54.6633, -3.3647],
    'Workington': [54.6422, -3.5436],
    'Keswick': [54.6014, -3.1344],
    'Kendal': [54.3275, -2.7444],
    'Ambleside': [54.4310, -2.9639],
    'Coniston': [54.3692, -3.0747],
    'Grange-over-Sands': [54.1978, -2.9044],

    // England - Lancashire
    'Carnforth': [54.1306, -2.7756],
    'Preston': [53.7632, -2.7031],
    'Blackpool': [53.8175, -3.0357],
    'Leyland': [53.6977, -2.6881],

    // England - Yorkshire
    'Holmfirth': [53.5690, -1.7866],

    // England - Cheshire
    'Sandbach': [53.1456, -2.3617],

    // England - Suffolk
    'Stowmarket': [52.1881, 1.0006],
    'Aldeburgh': [52.1550, 1.5997],
    'Sudbury': [52.0394, 0.7314],

    // England - Essex
    'Chelmsford': [51.7356, 0.4685],

    // England - Kent
    'Canterbury': [51.2802, 1.0789],
    'Ashford': [51.1464, 0.8750],
    'Broadstairs': [51.3587, 1.4394],
    'Herne Bay': [51.3701, 1.1263],
    'Ramsgate': [51.3378, 1.4163],

    // England - Surrey
    'Dorking': [51.2342, -0.3331],
    'Godstone': [51.2525, -0.0547],

    // England - Sussex
    'Brighton': [50.8225, -0.1372],
    'Chichester': [50.8365, -0.7792],

    // England - Berkshire
    'Newbury': [51.4014, -1.3231],
    'Hungerford': [51.4139, -1.5181],

    // England - Oxfordshire
    'Abingdon': [51.6708, -1.2833],
    'Wantage': [51.5886, -1.4261],

    // England - Gloucestershire
    'Cirencester': [51.7197, -1.9681],
    'Dursley': [51.6803, -2.3539],
    'Stroud': [51.7450, -2.2094],

    // England - Wiltshire
    'Marlborough': [51.4197, -1.7281],
    'Chippenham': [51.4581, -2.1164],
    'Devizes': [51.3519, -1.9981],
    'Warminster': [51.2047, -2.1781],
    'Trowbridge': [51.3197, -2.2086],
    'Melksham': [51.3733, -2.1344],
    'Bradford-on-Avon': [51.3472, -2.2508],
    'Salisbury': [51.0689, -1.7944],

    // England - Somerset
    'Bath': [51.3751, -2.3697],
    'Bridgwater': [51.1281, -3.0036],
    'Wells': [51.2089, -2.6472],
    'Glastonbury': [51.1492, -2.7142],
    'Frome': [51.2275, -2.3200],
    'Weston-super-Mare': [51.3458, -2.9775],
    'Somerton': [51.0581, -2.7314],
    'Castle Cary': [51.0892, -2.5158],

    // England - Devon
    'Exeter': [50.7184, -3.5339],
    'Plymouth': [50.3755, -4.1427],
    'Torquay': [50.4619, -3.5253],
    'Totnes': [50.4314, -3.6847],
    'Dartmouth': [50.3517, -3.5794],
    'Newton Abbot': [50.5308, -3.6097],
    'Exmouth': [50.6178, -3.4131],
    'Honiton': [50.7989, -3.1953],
    'Okehampton': [50.7367, -4.0000],
    'Barnstaple': [51.0803, -4.0581],
    'Bideford': [51.0167, -4.2067],
    'Kingsbridge': [50.2844, -3.7764],

    // England - Cornwall
    'Truro': [50.2632, -5.0510],
    'Penzance': [50.1186, -5.5370],
    'Newquay': [50.4161, -5.0653],
    'Bodmin': [50.4669, -4.7219],
    'Saint Austell': [50.3408, -4.7881],
    'Saint Ives': [50.2139, -5.4806],
    'Hayle': [50.1844, -5.4211],
    'Helston': [50.1033, -5.2706],

    // England - Dorset
    'Dorchester': [50.7156, -2.4417],
    'Poole': [50.7150, -1.9872],
    'Weymouth': [50.6139, -2.4581],
    'Bridport': [50.7333, -2.7581],

    // England - Worcestershire
    'Worcester': [52.1936, -2.2211],
    'Bewdley': [52.3750, -2.3167],
    'Kidderminster': [52.3881, -2.2525],
    'Malvern': [52.1119, -2.3244],
    'Bromsgrove': [52.3356, -2.0619],

    // England - Herefordshire
    'Hereford': [52.0567, -2.7156],

    // England - Shropshire
    'Shrewsbury': [52.7069, -2.7531],
    'Telford': [52.6781, -2.4453],
    'Ludlow': [52.3675, -2.7158],
    'Bridgnorth': [52.5336, -2.4189],
    'Bishops Castle': [52.4897, -3.0128],
    'Craven Arms': [52.4431, -2.8364],

    // England - West Midlands
    'Wolverhampton': [52.5864, -2.1286],
    'Stourbridge': [52.4564, -2.1439],
    'Brierley Hill': [52.4819, -2.1231],

    // Scotland - Highland
    'Inverness': [57.4778, -4.2247],
    'Fort William': [56.8198, -5.1052],
    'Thurso': [58.5944, -3.5267],
    'Wick': [58.4394, -3.0947],
    'Dornoch': [57.8800, -4.0289],
    'Tain': [57.8153, -4.0511],
    'Portree': [57.4128, -6.1944],

    // Scotland - Aberdeenshire
    'Aberdeen': [57.1497, -2.0943],
    'Huntly': [57.4467, -2.7764],
    'Keith': [57.5467, -2.9519],
    'Banff': [57.6689, -2.5261],

    // Scotland - Other
    'Dundee': [56.4620, -2.9707],
    'Stirling': [56.1165, -3.9369],
    'Falkirk': [56.0018, -3.7839],
    'Castle Douglas': [54.9417, -3.9306],
    'Elgin': [57.6495, -3.3242],
    'Oban': [56.4153, -5.4700],
    'Campbeltown': [55.4264, -5.6056],
    // Additional missing cities
    'Aberfeldy': [56.6228, -3.8669],
    'Aberlour': [57.4758, -3.2281],
    'Acharacle': [56.7931, -5.8500],
    'Achnasheen': [57.5997, -5.2625],
    'Alness': [57.6967, -4.2500],
    'Annan': [54.9894, -3.2644],
    'Aviemore': [57.1903, -3.8264],
    'Axbridge': [51.2856, -2.8194],
    'Ballindalloch': [57.4167, -3.3667],
    'Bedford': [52.1358, -0.4606],
    'Beith': [55.7508, -4.6353],
    'Bishops Stortford': [51.8710, 0.1614],
    'Brixham': [50.3939, -3.5158],
    'Bromyard': [52.1856, -2.5081],
    'Brora': [58.0153, -3.8456],
    'Buckie': [57.6783, -2.9658],
    'Bude': [50.8264, -4.5436],
    'Budleigh Salterton': [50.6322, -3.3208],
    'Cairndow': [56.2317, -4.9364],
    'Caithness': [58.4167, -3.5000],
    'Caldicot': [51.5889, -2.7811],
    'Charlestown': [50.3425, -4.7569],
    'Chepstow': [51.6414, -2.6736],
    'Clevedon': [51.4386, -2.8506],
    'Clydebank': [55.9000, -4.4056],
    'Coatbridge': [55.8622, -4.0172],
    'Coventry': [52.4068, -1.5197],
    'Cromarty': [57.6794, -4.0342],
    'Denbigh': [53.1831, -3.4161],
    'Dingwall': [57.5947, -4.4281],
    'Doune': [56.1864, -4.0503],
    'Downpatrick': [54.3306, -5.7111],
    'Dumbarton': [55.9447, -4.5689],
    'Enniskillen': [54.3442, -7.6336],
    'Forres': [57.6092, -3.6131],
    'Gairloch': [57.7131, -5.6981],
    'Girvan': [55.2439, -4.8553],
    'Grantown-on-Spey': [57.3264, -3.6053],
    'Greenock': [55.9486, -4.7642],
    'Invergordon': [57.6847, -4.1800],
    'Inverurie': [57.2822, -2.3742],
    'Isle of Arran': [55.5833, -5.2500],
    'Isle of Barra': [57.0000, -7.4000],
    'Isle of Bute': [55.8333, -5.0833],
    'Isle of Cumbrae': [55.7667, -4.9167],
    'Isle of Eigg': [56.9000, -6.1500],
    'Isle of Gigha': [55.6667, -5.7500],
    'Isle of Harris': [57.7500, -6.8333],
    'Isle of Islay': [55.7500, -6.2000],
    'Isle of Jura': [55.9500, -6.0000],
    'Isle of Lewis': [58.2000, -6.3833],
    'Isle of Tiree': [56.5000, -6.8833],
    'Isles of Scilly': [49.9167, -6.3167],
    'Ivybridge': [50.3953, -3.9219],
    'Kilmarnock': [55.6114, -4.4989],
    'Kingswinford': [52.5006, -2.2422],
    'Kington': [52.2056, -3.0447],
    'Kinlochleven': [56.7181, -4.9669],
    'Kirkwall': [58.9811, -2.9608],
    'Kyle': [57.2786, -5.7139],
    'Langport': [51.0394, -2.8281],
    'Launceston': [50.6364, -4.3586],
    'Liskeard': [50.4533, -4.4669],
    'Lostwithiel': [50.4056, -4.6708],
    'Mallaig': [57.0058, -5.8294],
    'Malmesbury': [51.5808, -2.0997],
    'Mauchline': [55.5169, -4.3747],
    'Melton Mowbray': [52.7664, -0.8856],
    'Much Wenlock': [52.5969, -2.5569],
    'Muir of Ord': [57.5122, -4.4614],
    'Munlochy': [57.5311, -4.3742],
    'Nairn': [57.5847, -3.8769],
    'Newton Abbot': [50.5308, -3.6097],
    'Newton Stewart': [54.9533, -4.4836],
    'Newry': [54.1758, -6.3394],
    'Northampton': [52.2405, -0.9027],
    'Orkney': [59.0000, -3.0000],
    'Paisley': [55.8456, -4.4242],
    'Pewsey': [51.3392, -1.7747],
    'Plockton': [57.3333, -5.6667],
    'Portree': [57.4128, -6.1944],
    'Portrush': [55.2069, -6.6519],
    'Radstock': [51.2892, -2.4481],
    'Saint Agnes': [50.3100, -5.1150],
    'Saint Columb': [50.4333, -4.9167],
    'Sandown': [50.6517, -1.1642],
    'Shepton Mallet': [51.1894, -2.5394],
    'Spean Bridge': [56.9000, -4.9667],
    'Stamford': [52.6506, -0.4823],
    'Stornoway': [58.2097, -6.3889],
    'Stourport-on-Severn': [52.3406, -2.2881],
    'Stratford-upon-Avon': [52.1919, -1.7086],
    'Strathcarron': [57.3833, -5.5167],
    'Swadlincote': [52.7731, -1.5556],
    'Swindon': [51.5558, -1.7797],
    'Tamworth': [52.6339, -1.6950],
    'Tenbury Wells': [52.3131, -2.5969],
    'Tetbury': [51.6386, -2.1681],
    'Usk': [51.7000, -2.9000],
    'Wadebridge': [50.5158, -4.8325],
    'Ware': [51.8111, -0.0281],
    'Whitchurch': [52.9667, -2.6833],
    'Wimborne': [50.7997, -1.9858],
    'Wotton-under-Edge': [51.6306, -2.3469],

    // Wales
    'Tenby': [51.6722, -4.7017],
    'Newport': [51.5842, -2.9977],
    'Swansea': [51.6214, -3.9436],
    'Caernarfon': [53.1386, -4.2761],
    'Newtown': [52.5117, -3.3139],

    // Northern Ireland
    'Londonderry': [54.9966, -7.3086],
    'Newtownards': [54.5914, -5.6892],
    'Lisburn': [54.5139, -6.0489],
  }

  // First try to get exact city coordinates
  if (cityCoords[establishment.city]) {
    console.log('Found city coordinates for:', establishment.city)
    return cityCoords[establishment.city]
  }

  // Fallback to county-level coordinates if city not found
  const locationInfo = cityToCounty[establishment.city]
  if (locationInfo) {
    const countyCoords: Record<string, [number, number]> = {
      // England
      'Hampshire': [51.0578, -1.3081],
      'West Sussex': [50.8365, -0.7792],
      'East Sussex': [50.9097, 0.2649],
      'Kent': [51.2802, 1.0789],
      'Surrey': [51.2342, -0.3331],
      'Berkshire': [51.4014, -1.3231],
      'Oxfordshire': [51.7612, -1.2534],
      'Buckinghamshire': [51.8168, -0.8067],
      'Hertfordshire': [51.8090, -0.2377],
      'Essex': [51.7356, 0.4685],
      'Greater London': [51.5074, -0.1278],
      'Gloucestershire': [51.8642, -2.2381],
      'Wiltshire': [51.3503, -1.9923],
      'Somerset': [51.1050, -2.9503],
      'Devon': [50.7184, -3.5339],
      'Cornwall': [50.2632, -5.0510],
      'Dorset': [50.7156, -2.4417],
      'Cumbria': [54.4609, -3.0886],
      'Lancashire': [53.7632, -2.7031],
      'North Yorkshire': [54.2252, -1.3436],
      'West Yorkshire': [53.8008, -1.5491],
      'South Yorkshire': [53.3811, -1.4701],
      'Derbyshire': [53.1362, -1.4914],
      'Nottinghamshire': [53.0832, -0.9776],
      'Leicestershire': [52.6369, -1.1397],
      'Warwickshire': [52.2819, -1.5336],
      'Worcestershire': [52.1936, -2.2211],
      'Herefordshire': [52.0567, -2.7156],
      'Shropshire': [52.7069, -2.7531],
      'Staffordshire': [52.8321, -2.0074],
      'West Midlands': [52.4862, -1.8904],
      'Cheshire': [53.1456, -2.3617],
      'Merseyside': [53.4084, -2.9916],
      'Greater Manchester': [53.4808, -2.2426],
      'Tyne and Wear': [54.9783, -1.6178],
      'Northumberland': [55.2083, -2.0784],

      // Scotland
      'Highland': [57.4778, -4.2247],
      'Aberdeenshire': [57.1497, -2.0943],
      'Moray': [57.6495, -3.3242],
      'Angus': [56.6716, -2.8734],
      'Perthshire': [56.3952, -3.4304],
      'Stirlingshire': [56.1165, -3.9369],
      'Fife': [56.2099, -3.1681],
      'Midlothian': [55.9533, -3.1883],
      'West Lothian': [55.9020, -3.5220],
      'Scottish Borders': [55.5269, -2.7812],
      'Dumfries and Galloway': [54.9417, -3.9306],
      'Ayrshire': [55.4651, -4.6290],
      'North Ayrshire': [55.6816, -4.8000],
      'Lanarkshire': [55.8642, -4.2518],
      'Renfrewshire': [55.8456, -4.4351],
      'Dunbartonshire': [55.9414, -4.5581],
      'Argyll and Bute': [56.4153, -5.4700],
      'Western Isles': [57.6910, -7.3420],
      'Orkney': [58.9800, -2.9000],
      'Shetland': [60.1557, -1.1482],

      // Wales
      'Gwynedd': [53.0000, -4.0000],
      'Conwy': [53.2759, -3.8284],
      'Anglesey': [53.2536, -4.3643],
      'Denbighshire': [53.1595, -3.4031],
      'Flintshire': [53.2397, -3.1555],
      'Wrexham': [53.0478, -2.9916],
      'Powys': [52.1659, -3.3518],
      'Ceredigion': [52.2411, -4.0436],
      'Pembrokeshire': [51.8013, -4.9718],
      'Carmarthenshire': [51.8013, -4.3106],
      'Swansea': [51.6214, -3.9436],
      'Neath Port Talbot': [51.5609, -3.7837],
      'Bridgend': [51.5045, -3.5769],
      'Vale of Glamorgan': [51.4089, -3.4653],
      'Cardiff': [51.4816, -3.1791],
      'Rhondda Cynon Taf': [51.6585, -3.3756],
      'Merthyr Tydfil': [51.7487, -3.3816],
      'Caerphilly': [51.5746, -3.2184],
      'Blaenau Gwent': [51.7747, -3.2061],
      'Torfaen': [51.7010, -3.0434],
      'Monmouthshire': [51.8119, -2.7132],
      'Newport': [51.5842, -2.9977],

      // Northern Ireland
      'County Antrim': [54.7877, -6.0693],
      'County Armagh': [54.3503, -6.6528],
      'County Down': [54.3294, -5.8574],
      'County Fermanagh': [54.2973, -7.6016],
      'County Londonderry': [54.9966, -7.3086],
      'County Tyrone': [54.6114, -7.1112]
    }

    if (countyCoords[locationInfo.county]) {
      console.log('Found county coordinates for:', locationInfo.county)
      return countyCoords[locationInfo.county]
    }
  }

  console.log('No coordinates found for:', establishment.city)
  return null
}