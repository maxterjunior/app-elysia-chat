import { Elysia, } from "elysia";
import { socketsStore } from "../core/store";

export const testRegister = new Elysia()
    .get("/users", () => {
        // Send data to all connected clients
        console.log(socketsStore.keys())
        socketsStore.forEach((value) => {
            value.ws.send({
                message: "Hello, World!",
                time: Date.now(),
            });
        })
        return {
            users: socketsStore.size
        }
    })
    .get("/", ({ body, query }) => {
        return {
            message: "Bienvenido a Elysia",
            time: Date.now(),
            body,
            query
        };
    })

    .post("/", (req) => {
        // Send data to all connected clients
        socketsStore.forEach((value, key) => {
            value.ws.send({
                message: "Hello, World!",
                time: Date.now(),
            });
        })
    })