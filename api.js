import axios from "axios";

const tippingpointApi = axios.create({
	baseURL: "http://localhost:3001",
});

export const getItems = () => {
	return tippingpointApi.get("/items").then((res) => {
		return res.data;
	});
};

export const getChatList = () => {
	return tippingpointApi.get("/chats").then((res) => {
		return res.data;
	});
};

export const getItemById = (id) => {
	return tippingpointApi.get(`/items/${id}`).then((res) => {
		return res.data;
	});
};

export const postItem = (obj) => {
	return tippingpointApi.post(`/items/`, obj).then((res) => {
		return res.data;
	});
};

export const postUser = (obj) => {
	return tippingpointApi.post("/users", obj).then((res) => {
		return res.data;
	});
};
export const patchItem = (id) => {
	return tippingpointApi
		.get(`/items/${id}`)
		.then((res) => {
			const item = res.data;
			item.likes++;
			return item;
		})
		.then((res) => {
			return tippingpointApi.put(`/items/${id}`, res).then((res) => {
				return res.data;
			});
		});
};
