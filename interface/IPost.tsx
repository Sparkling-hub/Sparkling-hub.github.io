import { EditorState } from "draft-js";


interface IPost {
	id: string;
	date: string;
	description: string | EditorState;
	fileUrl: string;
	tags: string[];
	title: string;
	fileName:string;
}
export default IPost