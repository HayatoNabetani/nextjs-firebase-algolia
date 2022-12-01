import Button from "../components/button";
// const { useForm } from ""

const CreateAccount = () => {
    return (
        <div>
            <h1>アカウント作成</h1>
            <div>
                <label htmlFor="name">名前：</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="nickname">ニックネーム：</label>
                <input type="text" name="nickname" id="nickname" />
            </div>
            <div>
                <label htmlFor="profile">プロフィール：</label>
                <input type="text" name="profile" id="profile" />
            </div>

            <Button>アカウント作成</Button>
        </div>
    );
};

export default CreateAccount;
