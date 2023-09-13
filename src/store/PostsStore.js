import {defineStore} from "pinia";
import {useFilterStore} from "@/store/FilterStore";

export const usePostsStore = defineStore('todosStore', {
    state: () => ({
        posts: []
    }),
    actions: {
        createPost(post) {
            this.posts.push(post)
        }
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
        }
    }
})