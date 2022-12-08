import { ReactElement } from "react";
import Layout from "../components/layout";
import UserForm from "../components/user-fom";
import { NextPageWithLayout } from "./_app";

const CreateAccount: NextPageWithLayout = () => {
    return <UserForm isEditMode={false} />;
};
CreateAccount.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default CreateAccount;
