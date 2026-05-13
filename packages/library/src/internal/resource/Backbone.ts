import { BaseElement } from "../BaseElement";
import { BackboneElementData } from "./backbone.data";

export abstract class Backbone<
	D extends BackboneElementData,
> extends BaseElement<D> {}
