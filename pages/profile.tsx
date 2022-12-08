import { ReactElement } from "react";
import Button from "../components/button";
import Layout from "../components/layout";
import UserForm from "../components/user-fom";
import { login } from "../lib/auth";
import { NextPageWithLayout } from "./_app";

const Profile: NextPageWithLayout = () => {
    return <UserForm isEditMode={true} />;
};

Profile.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Profile;
