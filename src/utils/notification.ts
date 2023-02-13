import { Loading, Notify } from "quasar";

Notify.setDefaults({
	position: "top",
	textColor: "yellow",
	timeout: 3000,
	actions: [{ icon: "close", color: "white" }],
});

function ShowErrorWithNotify(error: any): void {
	Loading.hide();
	let msg = "Hiba!";

	// The optional chaining (?.) operator accesses an object's property or calls a function.
	// If the object accessed or function called is undefined or null,
	// it returns undefined instead of throwing an error.
	if (error?.response?.data?.status) {
		msg += ` (${error.response.data.status}):`;
	} else if (error?.response?.status) {
		msg += ` (${error.response.status}):`;
	} else {
		msg += ":";
	}

	if (error?.response?.data?.message) {
		msg += ` ${error.response.data.message}`;
	} else if (error?.response?.message) {
		msg += ` ${error.response.message}`;
	} else if (error?.request && error?.message) {
		msg += ` No response(${error.message})`; // if no response
	} else if (error?.message) {
		msg += ` Message(${error.message})`;
	} else {
		msg += " Unknow error message";
	}

	Notify.create({ message: msg, color: "negative" });
}

export { ShowErrorWithNotify };
