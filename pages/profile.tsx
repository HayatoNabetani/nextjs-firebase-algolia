import { ReactElement } from "react";
import Button from "../components/button";
import Layout from "../components/layout";
import { login } from "../lib/auth";
import { NextPageWithLayout } from "./_app";

const Profile: NextPageWithLayout = () => {
    return (
        <div>
            <h1>プロフィール画面</h1>
            <p>
                これはテストこれはテストこれはテストこれはテストこれはテストこれはテスト
                これはテスト これはテスト これはテスト これはテスト これはテスト
            </p>
        </div>
    );
};

Profile.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Profile;
