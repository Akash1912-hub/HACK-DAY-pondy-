from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)

# Enable CORS for all origins (allow cross-origin requests)
CORS(app)

# MongoDB Configuration
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bank'
mongo = PyMongo(app)

# Loan Application Collection
loan_collection = mongo.db.loan_applications

# Insurance Application Collection
insurance_collection = mongo.db.insurance_applications

# Routes for Loan Applications

# Get all loan applications
@app.route('/api/loan-applications', methods=['GET'])
def get_loan_applications():
    try:
        loan_applications = list(loan_collection.find())
        for loan in loan_applications:
            loan['_id'] = str(loan['_id'])  # Convert ObjectId to string
        return jsonify(loan_applications), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching loan applications', 'error': str(e)}), 500

# Update loan application status
@app.route('/api/loan-applications/<loan_id>', methods=['PUT'])
def update_loan_application_status(loan_id):
    try:
        status = request.json.get('status')  # "approved" or "rejected"
        result = loan_collection.update_one(
            {'_id': ObjectId(loan_id)}, 
            {'$set': {'status': status}}
        )
        if result.matched_count > 0:
            updated_loan = loan_collection.find_one({'_id': ObjectId(loan_id)})
            updated_loan['_id'] = str(updated_loan['_id'])  # Convert ObjectId to string
            return jsonify(updated_loan), 200
        return jsonify({'message': 'Loan application not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error updating loan application status', 'error': str(e)}), 500

# Routes for Insurance Applications

# Get all insurance applications
@app.route('/api/insurance-applications', methods=['GET'])
def get_insurance_applications():
    try:
        insurance_applications = list(insurance_collection.find())
        for application in insurance_applications:
            application['_id'] = str(application['_id'])  # Convert ObjectId to string
        return jsonify(insurance_applications), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching insurance applications', 'error': str(e)}), 500

# Update insurance application status
@app.route('/api/insurance-applications/<application_id>', methods=['PUT'])
def update_insurance_application_status(application_id):
    try:
        status = request.json.get('status')  # "approved" or "rejected"
        result = insurance_collection.update_one(
            {'_id': ObjectId(application_id)}, 
            {'$set': {'status': status}}
        )
        if result.matched_count > 0:
            updated_application = insurance_collection.find_one({'_id': ObjectId(application_id)})
            updated_application['_id'] = str(updated_application['_id'])  # Convert ObjectId to string
            return jsonify(updated_application), 200
        return jsonify({'message': 'Insurance application not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error updating insurance application status', 'error': str(e)}), 500

# Start Flask server
if __name__ == '__main__':
    app.run(port=5000)
