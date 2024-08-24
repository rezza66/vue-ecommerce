
async function fetchProducts() {
  try {
    const response = await fetch("https://sistemtoko.com/public/demo/product");
    console.log("API Response:", response); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Data:", data); 
    return data.aaData; 
  } catch (error) {
    console.error("Error fetching products:", error); 
    throw error;
  }
}

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  components: {
    "home-component": {
      data() {
        return {
          products: [],
          loading: false,
          error: null,
        };
      },
      created() {
        this.fetchProducts();
      },
      methods: {
        async fetchProducts() {
          this.loading = true;
          try {
            console.log("Memulai pengambilan produk...");
            const products = await fetchProducts();
            console.log("Data produk yang diterima:", products); 
            this.products = products;
          } catch (error) {
            this.error = "Gagal mengambil data produk";
            console.error("Error dalam fetchProducts:", error); 
          } finally {
            this.loading = false;
          }
        },
      },
      
      template: `
      <v-app>
      <!-- Navbar -->
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>E-Commerce</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>Home</v-btn>
        <v-btn text>About</v-btn>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
          <v-container>
              <v-row>
                  <v-col cols="12">
                      <h1>E-Commerce</h1>
                  </v-col>
                  <v-col cols="12">
                      <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                      <v-alert v-if="error" type="error">{{ error }}</v-alert>
                  </v-col>
                  <v-col v-for="product in products" :key="product.id" cols="12" md="4">
                      <v-card>
                          <v-img :src="product.photo" height="200px"></v-img>
                          <v-card-title>{{ product.name }}</v-card-title>
                          <v-card-subtitle>{{ product.price }}</v-card-subtitle>
                          <v-card-actions>
                              <v-btn color="primary">Beli</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-col>
              </v-row>
          </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer app color="primary" dark>
        <v-col class="text-center white--text">
          &copy; {{ new Date().getFullYear() }} E-Commerce, Inc. All rights reserved.
        </v-col>
      </v-footer>
      </v-app>
          `,
          
    },
  },
});

