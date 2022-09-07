export default function({ $auth, redirect }) {
    if ($auth.user.subscribed) {
        return redirect('/swap');
    }
}