import {module} from "angular";
import ProductsController from "./ProductsController";

export const app = module("app", []);

app.controller("productsController", ProductsController);
