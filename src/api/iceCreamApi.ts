
import axios from "axios";

// Define the ice cream type
export interface IceCream {
  id: number;
  company: string;
  type: string;
  size: string;
  price: number;
  flavour: string;
  color: string;
  expire_date: string;
  images: string[];
  is_popular: boolean;
  created_at?: string;
  updated_at?: string;
}

// This is a mock API service that simulates backend calls
// In a real application, these would make actual API calls to your backend
class IceCreamApi {
  private mockData: IceCream[] = [
    {
      id: 1,
      company: "Walls",
      type: "Cup",
      size: "Medium",
      price: 120.00,
      flavour: "Chocolate Chip",
      color: "#7D4C92",
      expire_date: "2025-08-01",
      images: [
        "https://images.unsplash.com/photo-1629385084901-d41c354d3d20?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587563974074-5776a21a396c?q=80&w=2070&auto=format&fit=crop"
      ],
      is_popular: true
    },
    {
      id: 2,
      company: "Walls",
      type: "Cone",
      size: "Large",
      price: 150.00,
      flavour: "Vanilla Bean",
      color: "#FEDB39",
      expire_date: "2025-07-15",
      images: [
        "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=987&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1538489949601-cbf7d82e4e16?q=80&w=1972&auto=format&fit=crop"
      ],
      is_popular: true
    },
    {
      id: 3,
      company: "Walls",
      type: "Stick",
      size: "Small",
      price: 80.00,
      flavour: "Strawberry",
      color: "#3BACB6",
      expire_date: "2025-06-30",
      images: [
        "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?q=80&w=1812&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1633933358116-a27b902fad35?q=80&w=1974&auto=format&fit=crop"
      ],
      is_popular: false
    },
    {
      id: 4,
      company: "Walls",
      type: "Tub",
      size: "Large",
      price: 250.00,
      flavour: "Mint Chocolate",
      color: "#82DBD8",
      expire_date: "2025-09-15",
      images: [
        "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?q=80&w=1170&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127&auto=format&fit=crop"
      ],
      is_popular: true
    },
    {
      id: 5,
      company: "Walls",
      type: "Cup",
      size: "Medium",
      price: 140.00,
      flavour: "Cookie Dough",
      color: "#BFDB38",
      expire_date: "2025-08-20",
      images: [
        "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?q=80&w=1988&auto=format&fit=crop"
      ],
      is_popular: false
    },
    {
      id: 6,
      company: "Walls",
      type: "Cone",
      size: "Small",
      price: 95.00,
      flavour: "Caramel Swirl",
      color: "#FFBB5C",
      expire_date: "2025-07-05",
      images: [
        "https://images.unsplash.com/photo-1612639267275-7c4ae6a12d84?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587563974670-b5181b459b30?q=80&w=1974&auto=format&fit=crop"
      ],
      is_popular: true
    }
  ];
  
  // Get all ice creams
  async getAllIceCreams(): Promise<IceCream[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.mockData]);
      }, 500);
    });
  }
  
  // Get popular ice creams
  async getPopularIceCreams(): Promise<IceCream[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockData.filter(iceCream => iceCream.is_popular));
      }, 500);
    });
  }
  
  // Get ice cream by id
  async getIceCreamById(id: number): Promise<IceCream | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockData.find(iceCream => iceCream.id === id));
      }, 500);
    });
  }
  
  // Add new ice cream
  async addIceCream(iceCream: Omit<IceCream, 'id'>): Promise<IceCream> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newIceCream: IceCream = {
          ...iceCream,
          id: this.mockData.length + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        this.mockData.push(newIceCream);
        resolve(newIceCream);
      }, 500);
    });
  }
  
  // Update ice cream
  async updateIceCream(id: number, iceCream: Partial<IceCream>): Promise<IceCream | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.mockData.findIndex(item => item.id === id);
        if (index === -1) {
          resolve(undefined);
          return;
        }
        
        this.mockData[index] = {
          ...this.mockData[index],
          ...iceCream,
          updated_at: new Date().toISOString()
        };
        
        resolve(this.mockData[index]);
      }, 500);
    });
  }
  
  // Delete ice cream
  async deleteIceCream(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.mockData.findIndex(item => item.id === id);
        if (index === -1) {
          resolve(false);
          return;
        }
        
        this.mockData.splice(index, 1);
        resolve(true);
      }, 500);
    });
  }
}

export const iceCreamApi = new IceCreamApi();
