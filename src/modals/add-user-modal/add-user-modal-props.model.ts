import { UserInfoModel } from "../../types/user-info.model";

export interface AddUserModalPropsModel {
	show?: boolean;
	onHide?: () => void;
	onSent?: (...data: any) => void;
	userData?: UserInfoModel
}