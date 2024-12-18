function createNode(level, weight, value, ub) {
    return {
        level,
        weight,
        value,
        ub
    }
}

function calculateUb(node, n) {
    if (node.weight >= capacity) return 0;
    return node.value + (capacity - node.weight) * (values[node.level] / weights[node.level]);
}

function knapsackBranchAndBound(weights, values, capacity) {
        
    const n = weights.length;
    let maxValue = 0; 

    const items = weights.map((w, i) => ({ weight: w, value: values[i], ratio: values[i] / w })).sort((a, b) => b.ratio - a.ratio);

    weights = items.map(item => item.weight);
    values = items.map(item => item.value);

    let queue = [];
    const root = createNode(0, 0, 0, 0);

    
    root.ub = calculateUb(root, n);
    
    queue.push(root);

    while (queue.length > 0) {

        queue.sort((a, b) => b.ub - a.ub);

        const node = queue.shift();

        // ub valid
        if (node.ub > maxValue && node.level < n) {

            // with item
            const withItem = createNode(
                node.level + 1,
                node.weight + weights[node.level],
                node.value + values[node.level],
                0
            );
            
            withItem.ub = calculateUb(withItem, n);
            
            if (withItem.weight <= capacity) {
                maxValue = Math.max(maxValue, withItem.value);
            }
            
            if (withItem.ub > maxValue) {
                queue.push(withItem);
            }

            // without item
            const withoutItem = createNode(node.level + 1, node.weight, node.value, 0);

            withoutItem.ub = calculateUb(withoutItem, n);

            if (withoutItem.ub > maxValue) {
                queue.push(withoutItem);
            }

        }
    }

    return maxValue;
}

const weights = [4, 7, 5, 3];
const values = [40, 42, 25, 12];
const capacity = 10;

console.log("Maximum value:", knapsackBranchAndBound(weights, values, capacity));