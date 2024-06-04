const socketPaths = {
    'flights': '/flights',
    'planes': 'isPlanesUpdate',
    'airports': 'isAirportsUpdate',
    'admins': '/admins',
    'passengers': '/passengers' 
}

const getSocketPathByItemCategory = (itemCategory) => {
    return socketPaths[itemCategory]
}

export default getSocketPathByItemCategory