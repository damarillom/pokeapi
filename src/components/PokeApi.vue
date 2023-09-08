<template>
    <v-container class="fill-height">
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-row>
                        <v-col md="5" cols="12">
                            <v-data-table-server
                                v-model:items-per-page="items_per_page"
                                v-model:page="page"
                                :headers="headers"
                                :items-length="total_pokes"
                                :loading="loading"
                                :items="pokes"
                                item-value="name"
                                class="elevation-1"
                                @update:options="loadPokes"
                                
                            >
                                <template v-slot:item.name="{item}">
                                    <p @click="getPokeData(item.raw)">{{ item.value.charAt(0).toUpperCase() + item.value.slice(1) }}</p>
                                </template>
                            </v-data-table-server>
                        </v-col>
                        <v-col v-if="poke_data['name']" md="7" cols="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Name" 
                                        v-model="poke_data.name" 
                                        :readonly="true" 
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" align-center>
                                    <v-img
                                        v-if="poke_data && poke_data.sprites && poke_data.sprites.front_default"
                                        :width="300"
                                        aspect-ratio="16/9"
                                        cover
                                        :src="poke_data.sprites.front_default"
                                        @click="clickedImg"
                                        :cover="true"
                                    ></v-img>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field 
                                        :label="'Clicks en ' + poke_data.name" 
                                        v-model="actual_clicks" 
                                        :readonly="true" 
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Total clicks" 
                                        v-model="total_clicks" 
                                        :readonly="true" 
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>

<script>
    import axios from "axios";
    export default {
        name:'PokeApi',
        data() {
          return {
            items_per_page: 10,
            page: 1,
            headers: [
                {
                    title: 'Pokémon',
                    align: 'start',
                    sortable: false,
                    key: 'name',
                },
                // { title: 'URL', key: 'url' },
            ],
            pokes: [],
            loading: false,
            total_pokes: 0,
            poke_data: {},
            actual_clicks: 0,
            total_clicks: 0,
          }
        },
        computed: {
            offset() {
                return (this.page - 1) * this.items_per_page;
            },
        },
        methods: {
            loadPokes() {
                this.loading = true;
                axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.items_per_page}&offset=${this.offset}`).then(resp => {
                    this.total_pokes = resp.data.count;
                    this.pokes = resp.data.results;
                    this.loading = false;
                }).catch(e => {
                    console.error(e);
                    this.loading = false;
                });
            },
            getPokeData(item) {
                axios.get(item.url).then(resp => {
                    this.poke_data = resp.data;
                    this.actual_clicks = 0;
                }).catch(e => {
                    console.error(e);
                });
            },
            clickedImg() {
                this.actual_clicks += 1;
                this.total_clicks += 1;
            }
        },
        mounted() {
            this.loadPokes();
        }
    }
    

</script>