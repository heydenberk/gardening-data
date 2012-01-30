(function() {
	var rows = document.querySelectorAll(".nutlist tbody tr, .nutlist-hscroll tbody tr");
	var nutrientMap = {
		"calcium, ca": "calcium",
		"carbohydrate, by difference": "carbohydrate",
		"iron, fe": "iron",
		"fatty acids, total monounsaturated": "monounsaturated fat",
		"fatty acids, total polyunsaturated": "polyunsaturated fat",
		"fatty acids, total saturated": "saturated fat",
		"fiber, total dietary": "dietary fiber",
		"folate, dfe": "dietary folate",
		"magnesium, mg": "magnesium",
		"phosphorus, p": "phosphorus",
		"potassium, k": "potassium",
		"sodium, na": "sodium",
		"sugars, total": "sugars",
		"total lipid (fat)": "fat",
		"vitamin a, rae": "vitamin a",
		"vitamin a, iu": "vitamin a iu",
		"vitamin d (d2 + d3)": "vitamin d2 and d3",
		"vitamin c, total ascorbic acid": "vitamin c",
		"vitamin e (alpha-tocopherol)": "vitamin e",
		"vitamin k (phylloquinone)": "vitamin k",
		"zinc, zn": "zinc"
	};
	var unitMap = {
		"g": "grams",
		"kcal": "kilocalories",
		"iu": "international unit",
		"mcg_dfe": "dietary folate equivalent",
		"mcg_rae": "retinol activity equivalent",
		"mg": "milligrams",
		"µg": "micrograms"
	};

	var normalizeNutrient = function(nutrient) {
		if (nutrient in nutrientMap) {
			nutrient = nutrientMap[nutrient];
		}
		return nutrient;
	};

	var normalizeUnit = function(unit) {
		if (unit in unitMap) {
			unit = unitMap[unit];
		}
		return unit;
	};

	var normalizeValue = function(value) {
		return parseFloat((parseFloat(value) / 100).toFixed(6));
	};

	var convertValue = function(value, unit, nutrient) {
		switch (unit) {
		
			case "micrograms":
				value /= 1000000;
				unit = "grams";
				break;
				
			case "milligrams":
				value /= 1000;
				unit = "grams";
				break;
		
			case "dietary folate equivalent":
				value /= 1000000; // an dfe is a microgram
				unit = "grams";
				break;
		
			case "retinol activity equivalent":
				value /= (1000000 / 12); // an rae is 12 micrograms
				unit = "grams";
				break;
		
			case "international unit":
				if (nutrient === "vitamin d") {
					value /= 40000000; // a vitamin d IU is 0.025 micrograms
					unit = "grams";
				}
				break;
		}

		return {
			unit: unit,
			value: value
		};
	}
	var nutrition = {};
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var cells = row.getElementsByTagName("td");
		if (cells.length === 1) { continue; } // it's a separator, skip it
		
		var nutrient = normalizeNutrient(cells[0].textContent.trim().toLowerCase());
		if (nutrient === "vitamin a iu") { continue; } // this is an outdated measurement

		var unit = normalizeUnit(cells[1].textContent.trim().toLowerCase());
		var valuePerGram = normalizeValue(cells[2].textContent, unit);
		var convertedValue = convertValue(valuePerGram, unit, nutrient);
		value = convertedValue.value;
		unit = convertedValue.unit;

		nutrition[nutrient] = {
			"value": value,
			"unit": unit
		};

	}

	console.log(JSON.stringify({ content: nutrition }, null, 4));
})();