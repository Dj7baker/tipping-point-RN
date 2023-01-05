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

export const getUserById = (id) => {
	return tippingpointApi.get(`/users/${id}`).then((res) => {
		console.log("res: ", res);
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

export const patchUserChat = (id, chat) => {
	return tippingpointApi
		.get(`/users/${id}`)
		.then((res) => {
			const user = res.data;
			user.chats.push(chat);
			return user;
		})
		.then((res) => {
			return tippingpointApi.put(`/users/${id}`, res).then((res) => {
				return res.data;
			});
		});
};
