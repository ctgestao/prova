const weights = [4, 7, 5, 3]; 
const values = [40, 42, 25, 12];
const n = weights.length;
const capacity = 10;

const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
 
for (let i = 1; i <= n; i++) {
	for (let j = 0; j <= capacity; j++) {

		if (weights[i - 1] > j) { // exeeds capacity, copy from above
			dp[i][j] = dp[i - 1][j];
		} else {
			dp[i][j] = Math.max( dp[i - 1][j], values[i - 1] + dp[i - 1][j - weights[i - 1]]); // Choose maximum row above 
		}

	}
}

console.log("Table:");
for (let row of dp) {
  	console.log(row.join("\t"));
}

// Maximum value for the given knapsack capacity
console.log("\nMaximum Value for the Knapsack Problem:", dp[n][capacity]);
console.log("\nSelected Items: ", getSelected(dp, weights, n, capacity))

function getSelected(table, weights, n, capacity) {

	let i = n;
	let j = capacity;
	const selectedItems = [];

	while (i > 0 && j > 0) {
		if (table[i][j] !== table[i - 1][j]) {
			selectedItems.push(i - 1); 
			j -= weights[i - 1];
		}
		i--;
	}

	return selectedItems;

}