from flask import Flask, jsonify, request
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)

with open("products.json", "r") as file:
    products = json.load(file)

# Home route
@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "Backend is running"
    })

# SEARCH + UNIQUE FEATURE (BEST DEAL ENGINE)
@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("query", "")

    if not query:
        return jsonify({
            "success": False,
            "message": "Query parameter is required",
            "data": []
        })

    result = []

    for item in products:
        if query.lower() in item["name"].lower():

            amazon = item["amazon"]
            flipkart = item["flipkart"]

            # 🧠 BEST DEAL LOGIC (UNIQUE FEATURE)
            if amazon < flipkart:
                best_platform = "Amazon"
                savings = flipkart - amazon
            else:
                best_platform = "Flipkart"
                savings = amazon - flipkart

            result.append({
                "id": item["id"],
                "name": item["name"],
                "amazon": amazon,
                "flipkart": flipkart,
                "bestPlatform": best_platform,
                "savings": savings
            })

    return jsonify({
        "success": True,
        "count": len(result),
        "data": result
    })


if __name__ == "__main__":
    app.run(debug=True)