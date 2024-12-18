const graph = {
    A: { B: 2, D: 8 },
    B: { A: 2, D: 5, E: 6 },
    D: { A: 8, B: 5, E: 3, F: 2 },
    E: { B: 6, D: 3, F: 1, C: 9 },
    F: { D: 2, E: 1, C: 3 },
    C: { E: 9, F: 3 }
};

dijkstra(graph, 'A')

function dijkstra(graph, start) {

    let cities = Object.keys(graph)
    let unvisited = new Set();
    let visited = new Set();
    let table = {}
    
    for(let city of cities) {
        unvisited.add(city)
    }
    
    for(let city of cities) {
        table[city] = {
            shortest: Infinity,
            previous: undefined
        }
    }
    
    let city = start
    
    table[start] = {...table[start], shortest: 0}

    for (let i = 0; i < cities.length; i++) {
        let prev = city
        city = getNext(prev, table, visited, unvisited)
    }    

    console.log("Map: ", table)

}

function getNext(node, table, visited) {

    let neighbors = copy(graph[node])
    let nextCity
    let closerCity = Infinity
    let currentDistance = table[node].shortest

    for (let neighbor in neighbors) {
        if (visited.has(neighbor)) {
            delete neighbors[neighbor]
        }
    }

    for (let city in table) {
        if(neighbors[city] + currentDistance < table[city].shortest) {
            table[city].shortest = neighbors[city] +currentDistance
            table[city].previous = node
        }
    }

    visited.add(node)
    
    for (let neighbor in neighbors) {
        if (table[neighbor].shortest < closerCity) {
            closerCity = table[neighbor].shortest
            nextCity = neighbor
        }
    }

    return nextCity

} 

function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
}