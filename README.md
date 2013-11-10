RecipeMatch
=================================

This project is to build a web service so that user can search for possible
meals he can make based on those materials he already has.
On one hand, we have user's inventory of materials such as tomato and onion;
on the other, we have thousands of recipes to match with.

For example,

Jack has:                           we have these recipes in database:

[	                               {
	chicken,                            "Sweet and Sour Chicken":
	egg,                              		[ "chicken", "egg", "cornstarch"],
	tomato,                            	"Roasted Spicy Califlower":
	cheese,	                        		[ "califlower" ],
	onion,                             	"Tomato & Swiss Grilled Sandwiches":
	cucumber,                          		[ "cheese", "tomato", "spinach", "bread"],
	pepper,                            	"Greek Roasted Tomato Salad":
	califlower,                        		[ "tomato", "broccoli", "onion", "spinach", "chick peas", "feta cheese"],
	zucchini                           	"Sauteed Zucchini, Peppers, and Tomatoes":
]		                               		[ "zucchini", "pepper", "tomato"],
		                               	"Cucumbers and Onions":
		                               		[ "cucumber", "onion"]
		                            }

then, the "matching" result should include "Roasted Spicy Califlower",
"Sauteed Zucchini, Peppers, and Tomatoes" and "Cucumbers and Onions" for Jack to choose.
And should not include "Sweet and Sour Chicken", because it requires "cornstarch"
which jack doesn't have.




