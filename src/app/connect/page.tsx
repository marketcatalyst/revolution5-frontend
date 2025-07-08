import { sendEmail } from './actions'; // Import our new server action

export default function ConnectPage() {
  return (
    <main className="bg-[#F5F5DC]">
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold font-serif tracking-tight text-[#36454F] sm:text-4xl">Connect With Us</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We welcome your interest and look forward to hearing from you.
          </p>
        </div>
        
        {/* The form tag now calls our 'sendEmail' server action */}
        <form action={sendEmail} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2.5">
                <input required type="text" name="name" id="name" autoComplete="name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input required type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            {/* Message Field */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea required name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" defaultValue={''} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button type="submit" className="block w-full rounded-md bg-green-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}