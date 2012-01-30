# gardening-data

This is a collection of JSON documents holding information about edible garden plants. It is being collected for use in an forthcoming open source web application to assist in garden planning and design.

In `plants/index.json` there is a simple index of the plants in the data set. It looks like this:

    {
    	"plants": [
    		"artichoke",
    		"asparagus",
    		/* ... et cetera */
    	]
    }

The names of plants in the `plants` array correspond to JSON files in the same directory with information about the properties of these plants. Those look like this:

	{
	    "content": {
	        "water": {
	            "value": [float],
	            "unit": [string](grams)
	        },
	        "energy": {
	            "value": [float],
	            "unit": [string](kilocalories)
	        },
	        /* ... */
	    },
	        "cultivationCategory": [string](vegetable|herb), 
	        "edibleParts": [Array](bulb|flower bud|fruit|leaf|leaf sheath|leaf stem|root|seed|stem|stem shoot|tuber), 
	        "germination": {
	            "duration": {
	                "max": [integer], 
	                "min": [integer], 
	                "unit": [string](days|weeks|years)
	            }, 
	            "rate": [float](0.0 - 1)
	        }, 
	        "hardinessZone": {
	            "max": [integer], 
	            "min": [integer]
	        }, 
	        "harvest": {
	            "duration": { /* ... */ }
	        }, 
	        "name": [string],
	    "plantingSeasons": [Array](winter|spring|summer|fall), 
	    "plantings": [
	        {
	            "depth": {
	                "size": [integer], 
	                "unit": [string](inch|foot)
	            }, 
	            "duration": { /* ... */ }, 
	            "spacing": {
	                "size": [integer], 
	                "unit": [string](inch|foot)
	            }
	        },
	        /* ... */
	    ], 
	    "soilImpact": [string](heavy feeder|light feeder|light giver|heavy giver), 
	    "species": [string], 
	    "sun": {
	        "max": [string](full shade|part shade|part sun|full sun), 
	        "min": [string](full shade|part shade|part sun|full sun)
	    }, 
	    "yield": {
	        "value": [integer],
	        "unit": [string](grams per square meter)
	    }
	}

## Open questions

- How can the need for "canonical" data be reconciled with the variety of gardening practices proscribing different cultivation techniques?

- Should property names with multiple words be formatted with whitespace, camel case or underscores?

- Should plants be grouped according to botanical categories or cultivation categories — eg., is pepper a fruit?

- Is it better to describe varieties as of plants with their own entry or within the parent plant data with only the varying properties listed?

## Tools

`Cakefile` is a simple script for reading the index and concatenating all the plants' JSON documents. `cake build` will print the JSON to stdout; `cake --output [PATH] build` will save the output to `[PATH]`.
