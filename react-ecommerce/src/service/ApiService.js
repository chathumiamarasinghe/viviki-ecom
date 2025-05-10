import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTh && USERS API */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data;
    }


    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        const data = response.data;
    
        
        if (data.token && data.role) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role); 
        }
    
        return data;
    }


    static async getLoggedInUserInfo() {
        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/user/get-all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async addUser(userData) {
        const response = await axios.post(`${this.BASE_URL}/user/add-user`, userData, {
            headers: this.getHeader()
        });
        return response.data;
    }
    
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/user/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }


    /**PRODUCT ENDPOINT */

    static async addProduct(formData) {
        const response = await axios.post(`${this.BASE_URL}/product/create`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async updateProduct(formData) {
        const response = await axios.put(`${this.BASE_URL}/product/update`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async getAllProducts() {
        const response = await axios.get(`${this.BASE_URL}/product/get-all`)
        return response.data;
    }

    static async searchProducts(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/product/search`, {
            params: { searchValue }
        });
        return response.data;
    }

    static async getAllProductsByCategoryId(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/product/get-by-category-id/${categoryId}`)
        return response.data;
    }

    static async getProductById(productId) {
        const response = await axios.get(`${this.BASE_URL}/product/get-by-product-id/${productId}`)
        return response.data;
    }

    static async deleteProduct(productId) {
        const response = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async downloadProductReport() {
        const response = await axios.get(`${this.BASE_URL}/api/report/products`, {
            headers: this.getHeader(),
            responseType: 'blob'
        });
        return response.data;
    }

    /**CATEGORY */
    static async createCategory(body) {
        const response = await axios.post(`${this.BASE_URL}/category/create`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getAllCategory() {
        const response = await axios.get(`${this.BASE_URL}/category/get-all`)
        return response.data;
    }

    static async getCategoryById(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/category/get-category-by-id/${categoryId}`)
        return response.data;
    }

    static async updateCategory(categoryId, body) {
        const response = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async deleteCategory(categoryId) {
        const response = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    /**ORDEDR */
    static async createOrder(body) {
        const response = await axios.post(`${this.BASE_URL}/order/create`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getAllOrders() {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getOrderItemById(itemId) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: {itemId}
        })
        return response.data;
    }

    static async getAllOrderItemsByStatus(status) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: {status}
        })
        return response.data;
    }

    static async updateOrderitemStatus(orderItemId, status) {
    const response = await axios.put(
        `${this.BASE_URL}/order/update-item-status/${orderItemId}?status=${status}`, 
        {}, 
        { headers: this.getHeader() }
    );
    return response.data;
}




    /**ADDRESS */
    static async saveAddress(body) {
        const response = await axios.post(`${this.BASE_URL}/address/save`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    /***AUTHEMNTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isInventoryManager() {
        const role = localStorage.getItem('role');
        return role === 'INVENTORY_MANAGER';
    }
    
    static isDeliveryPerson() {
        const role = localStorage.getItem('role');
        return role === 'DELIVERY_PERSON';
    }

    static isAdminOrInventoryManager() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN' || role === 'INVENTORY_MANAGER';
    }

    /**static isAdminOrDeliveryPerson() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN' || role === 'DELIVERY_PERSON';
    }*/


    /**MATERIAL ENDPOINT */

    static async addMaterial(formData) {
        const response = await axios.post(`${this.BASE_URL}/material/create`, formData, {
            headers: {
                ...this.getHeader(),
                
            }
        });
        return response.data;
    }
    

    static async updateMaterial(body) {
        const response = await axios.put(`${this.BASE_URL}/material/update`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllMaterials() {
        const response = await axios.get(`${this.BASE_URL}/material/get-all`)
        return response.data;
    }

    static async searchMaterials(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/material/search`, {
            params: { searchValue }
        });
        return response.data;
    }


    static async getMaterialById(materialId) {
        const response = await axios.get(`${this.BASE_URL}/material/get-by-material-id/${materialId}`)
        return response.data;
    }

    static async deleteMaterial(materialId) {
        const response = await axios.delete(`${this.BASE_URL}/material/delete/${materialId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /** REVIEW ENDPOINTS */


static async createReview(review) {
    const response = await axios.post(`${this.BASE_URL}/api/reviews`, review, {
        headers: this.getHeader()
    });
    return response.data;
}


static async getReviewsByProductId(productId) {
    const response = await axios.get(`${this.BASE_URL}/api/reviews/product/${productId}`);
    return response.data;
}

// Order report
static async downloadOrderItemsReport() {
    const response = await axios.get(`${this.BASE_URL}/api/report/orderitems`, {
        headers: this.getHeader(),
        responseType: 'blob'   
    });
    return response.data;
}

// Product report
static async downloadproductItemsReport() {
    const response = await axios.get(`${this.BASE_URL}/api/report/productlist`, {
        headers: this.getHeader(),
        responseType: 'blob'   
    });
    return response.data;
}

// Category report
static async downloadcategoryItemsReport() {
    const response = await axios.get(`${this.BASE_URL}/api/report/categorylist`, {
        headers: this.getHeader(),
        responseType: 'blob'   
    });
    return response.data;
}

// Material report
static async downloadmaterialItemsReport() {
    const response = await axios.get(`${this.BASE_URL}/api/report/materiallist`, {
        headers: this.getHeader(),
        responseType: 'blob'   
    });
    return response.data;
}

// User report
static async downloaduserReport() {
    const response = await axios.get(`${this.BASE_URL}/api/report/userdetails`, {
        headers: this.getHeader(),
        responseType: 'blob'   
    });
    return response.data;
}

static async createPaymentIntent(amount, currency = 'usd') {
    const response = await axios.post(`${this.BASE_URL}/api/payment/create-payment-intent`, {
        amount,
        currency
    }, {
        headers: this.getHeader()
    });
    return response.data;
}

/**MATERIALTYPE */
static async createMaterialType(body) {
    const response = await axios.post(`${this.BASE_URL}/materialType/create`, body, {
        headers: this.getHeader()
    })
    return response.data;
}

static async getAllMaterialTypes() {
    const response = await axios.get(`${this.BASE_URL}/materialType/get-all`)
    return response.data;
}

static async getMaterialTypeById(materialTypeId) {
    const response = await axios.get(`${this.BASE_URL}/materialType/get-materialType-by-id/${materialTypeId}`)
    return response.data;
}

static async updateMaterialType(materialTypeId, body) {
    const response = await axios.put(`${this.BASE_URL}/materialType/update/${materialTypeId}`, body, {
        headers: this.getHeader()
    })
    return response.data;
}

static async deleteMaterialType(materialTypeId) {
    const response = await axios.delete(`${this.BASE_URL}/materialType/delete/${materialTypeId}`, {
        headers: this.getHeader()
    })
    return response.data;
}


}