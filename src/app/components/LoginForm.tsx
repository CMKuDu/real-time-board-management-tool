import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 relative">
      <div className="absolute bottom-0 left-0">
        <img src="/images/left.png" alt="illustration" className="w-60" />
      </div>
      
      <div className="absolute bottom-0 right-0">
        <img src="/images/right.png" alt="illustration" className="w-60" />
      </div>
      <div className="bg-white border rounded-lg shadow p-8 w-[400px] text-center">
        <div className="mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto h-10" />
        </div>

        <h2 className="text-gray-700 text-sm mb-4">Log in to continue</h2>

        <form className="space-y-4">
          <Input placeholder="Enter your email" type="email" required />
          <Button className="w-full" type="submit">Continue</Button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          Privacy Policy <br />
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  )
}
