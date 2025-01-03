import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

# Load the dataset
# Assuming the data is saved as 'requests_data.csv', you can modify this based on your data source
data = pd.read_csv(r'C:\Users\mkaka\Downloads\requests_data.csv')  # Make sure your dataset is in CSV format or a similar readable format

# Basic preprocessing
data['Timestamp'] = pd.to_datetime(data['Timestamp'])  # Convert timestamp to datetime

# Calculate Request Frequency (e.g., time difference between requests from the same IP)
data['Request_Frequency'] = data.groupby('IP_address')['Timestamp'].transform(lambda x: x.diff().dt.seconds.fillna(0))

# Fill missing data in failed attempts (if any)
data['Failed_Attempts'] = data['Failed_Attempts'].fillna(0)

# Label Encoding for categorical variables (IP, Device_ID, User_Agent, Geo_Location, Request_Type)
le_ip = LabelEncoder()
le_device = LabelEncoder()
le_user_agent = LabelEncoder()
le_geo_location = LabelEncoder()
le_request_type = LabelEncoder()

data['IP_address'] = le_ip.fit_transform(data['IP_address'])
data['Device_ID'] = le_device.fit_transform(data['Device_ID'])
data['User_Agent'] = le_user_agent.fit_transform(data['User_Agent'])
data['Geo_Location'] = le_geo_location.fit_transform(data['Geo_Location'])
data['Request_Type'] = le_request_type.fit_transform(data['Request_Type'])

# Feature Selection: Choosing relevant features for the model
X = data[['IP_address', 'Device_ID', 'User_Agent', 'Request_Frequency', 'Failed_Attempts', 'Geo_Location', 'Request_Type']]

# Target variable (Label): Suspicious or Normal
y = data['Label'].map({'Normal': 0, 'Suspicious': 1})  # 0 = Normal, 1 = Suspicious

# Train-test split (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model Initialization: Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Training the model
model.fit(X_train, y_train)

# Predictions on the test set
y_pred = model.predict(X_test)

# Model Evaluation
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(f"Classification Report: \n{classification_report(y_test, y_pred)}")
print(f"Confusion Matrix: \n{confusion_matrix(y_test, y_pred)}")

# Save the trained model for future use
import joblib
joblib.dump(model, 'suspicious_request_model.pkl')  # Saving the model to a file

