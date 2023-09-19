import {defineStore} from "pinia";
import {useFilterStore} from "@/store/FilterStore";
import axios from "axios";

export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: []
    }),
    actions: {
        createPost(post) {
            this.posts.push(post)
        },
        deletePost(postID) {
            this.posts = this.posts.filter(post => post.id !== postID)
        },
        async fetchPosts() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')

                if (response.status === 200) {
                    this.posts.push(...response.data)
                }
            } catch (e) {

            }
        },
    },
    getters: {
        getFilterBySearchPosts() {
            const filterStore = useFilterStore()

            return this.posts.filter(post => post.title.includes(filterStore.search))
        },
        getFilterByCategoryPosts() {
            const filterStore = useFilterStore()

            return this.getFilterBySearchPosts.filter(post => {
                if(!filterStore.category) {
                    return post
                }
                return post.category === filterStore.category
            })
        },
        getCountPostsByCategory() {
            return (category) => this.posts.filter(post => post.category === category).length
        },
    }
})