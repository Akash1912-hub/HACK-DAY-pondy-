import React from 'react';
import { Mic, MessageSquare, Phone, Mail } from 'lucide-react';

function Support() {
  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Mic className="h-8 w-8 text-indigo-600" />
            <h2 className="ml-3 text-xl font-semibold">Voice Support</h2>
          </div>
          <p className="text-gray-600 mb-4">Get instant help with voice-enabled support</p>
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center">
            <Mic className="h-5 w-5 mr-2" />
            Start Voice Support
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
            <h2 className="ml-3 text-xl font-semibold">Live Chat</h2>
          </div>
          <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Start Chat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center p-4 border rounded-lg">
            <Phone className="h-6 w-6 text-indigo-600" />
            <div className="ml-4">
              <p className="font-medium">Phone Support</p>
              <p className="text-gray-500">1-800-123-4567</p>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg">
            <Mail className="h-6 w-6 text-indigo-600" />
            <div className="ml-4">
              <p className="font-medium">Email Support</p>
              <p className="text-gray-500">support@securebank.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Account Issues</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Support;