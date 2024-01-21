import { Button } from "@mui/material"
import useUserStore from "../../stores/useUserStore"

export default function LoginButton({ children, ...props }) {
    const login = useUserStore((s) =>  s.login)
    
    return (
        <Button
            aria-describedby="login-btn"
            variant="contained"
            onClick={login}
            size="small"
            sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
            color="secondary"
            { ...props }
        >
            {children || "Login to Play"}
        </Button>
    )
}