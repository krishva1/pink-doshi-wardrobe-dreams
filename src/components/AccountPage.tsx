
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AccountPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 123-4567"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated."
    });
  };
  
  const orderHistory = [
    {
      id: "ORD-2025-1234",
      date: "May 1, 2025",
      total: 489.98,
      status: "Delivered"
    },
    {
      id: "ORD-2025-1189",
      date: "April 15, 2025",
      total: 329.99,
      status: "Processing"
    },
    {
      id: "ORD-2025-1023",
      date: "March 28, 2025",
      total: 189.99,
      status: "Delivered"
    }
  ];
  
  const addresses = [
    {
      id: 1,
      type: "Shipping",
      name: "Emma Wilson",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true
    },
    {
      id: 2,
      type: "Billing",
      name: "Emma Wilson",
      address: "456 Style Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
      isDefault: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="bg-white p-6 border rounded-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <Button 
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                  <p className="mt-1">{formData.firstName}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                  <p className="mt-1">{formData.lastName}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1">{formData.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1">{formData.phone}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 border rounded-md">
            <h2 className="text-xl font-semibold mb-6">Password</h2>
            <Button variant="outline" onClick={() => {
              toast({
                title: "Password reset email sent",
                description: "Check your inbox for instructions to reset your password."
              });
            }}>
              Change Password
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="bg-white p-6 border rounded-md">
            <h2 className="text-xl font-semibold mb-6">Order History</h2>
            
            {orderHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Order ID</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-right">Total</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="link" className="text-pink-600 hover:text-pink-700 p-0">
                            View Order
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="addresses">
          <div className="bg-white p-6 border rounded-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <Button>Add New Address</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <h3 className="font-medium">{address.type}</h3>
                      {address.isDefault && (
                        <span className="ml-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-gray-700">
                    <p>{address.name}</p>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <p>{address.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preferences">
          <div className="bg-white p-6 border rounded-md">
            <h2 className="text-xl font-semibold mb-6">Communication Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="mt-1"
                  defaultChecked
                />
                <label htmlFor="newsletter" className="ml-3">
                  <div className="font-medium">Newsletter</div>
                  <div className="text-sm text-gray-500">Receive updates on new collections and exclusive offers.</div>
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="order-updates"
                  className="mt-1"
                  defaultChecked
                />
                <label htmlFor="order-updates" className="ml-3">
                  <div className="font-medium">Order Updates</div>
                  <div className="text-sm text-gray-500">Receive notifications about your orders and shipping.</div>
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="personalized"
                  className="mt-1"
                  defaultChecked
                />
                <label htmlFor="personalized" className="ml-3">
                  <div className="font-medium">Personalized Recommendations</div>
                  <div className="text-sm text-gray-500">Receive style suggestions based on your preferences and past purchases.</div>
                </label>
              </div>
            </div>
            
            <div className="mt-8">
              <Button onClick={() => {
                toast({
                  title: "Preferences saved",
                  description: "Your communication preferences have been updated."
                });
              }}>
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountPage;
