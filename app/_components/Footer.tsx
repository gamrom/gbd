"use client";

export const MainFooter = () => {
  return (
    <footer className="w-full p-4 mx-auto bg-white">
      <div className="max-w-screen-xl py-16 mx-auto space-y-2">
        {/* 문의 및 활동사진 */}
        <div>
          <ul className="flex gap-6 mt-8">
            <li className="flex items-center space-x-2">
              <a
                href="https://www.spacecloud.kr/space/58552"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <div className="font-medium text-gray-900 underline">
                  공간 대여 문의
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 space-2">
          {/* 운영 */}
          <div className="mb-4">
            <div className="font-medium text-gray-900">운영</div>

            <ul className="grid grid-cols-2 mt-2 text-sm space-2">
              <li>
                <span className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  회장 김은식{" "}
                </span>
              </li>

              <li>
                <span className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  운영진 정연은{" "}
                </span>
              </li>

              <li>
                <span className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  운영진 백승우{" "}
                </span>
              </li>

              <li>
                <span className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  운영진 송호민{" "}
                </span>
              </li>
            </ul>
          </div>

          {/* 사이트 개발 */}
          <div>
            <div className="font-medium text-gray-900">사이트 개발</div>

            <ul className="text-sm">
              <li className="flex items-center space-x-2">
                <div>Frontend Developer : 감롬</div>
                <a
                  target="_blank"
                  href="https://github.com/gamrom"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li className="flex items-center space-x-2">
                <div>Backend Developer : 원노의원투노</div>
                <a
                  target="_blank"
                  href="https://www.youtube.com/@won2know"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 12 4 C 12 4 5.7455469 3.9999687 4.1855469 4.4179688 C 3.3245469 4.6479688 2.6479687 5.3255469 2.4179688 6.1855469 C 1.9999687 7.7455469 2 12 2 12 C 2 12 1.9999687 16.254453 2.4179688 17.814453 C 2.6479687 18.675453 3.3255469 19.352031 4.1855469 19.582031 C 5.7455469 20.000031 12 20 12 20 C 12 20 18.254453 20.000031 19.814453 19.582031 C 20.674453 19.352031 21.352031 18.674453 21.582031 17.814453 C 22.000031 16.254453 22 12 22 12 C 22 12 22.000031 7.7455469 21.582031 6.1855469 C 21.352031 5.3255469 20.674453 4.6479688 19.814453 4.4179688 C 18.254453 3.9999687 12 4 12 4 z M 12 6 C 14.882 6 18.490875 6.1336094 19.296875 6.3496094 C 19.465875 6.3946094 19.604391 6.533125 19.650391 6.703125 C 19.891391 7.601125 20 10.342 20 12 C 20 13.658 19.891391 16.397875 19.650391 17.296875 C 19.605391 17.465875 19.466875 17.604391 19.296875 17.650391 C 18.491875 17.866391 14.882 18 12 18 C 9.119 18 5.510125 17.866391 4.703125 17.650391 C 4.534125 17.605391 4.3956094 17.466875 4.3496094 17.296875 C 4.1086094 16.398875 4 13.658 4 12 C 4 10.342 4.1086094 7.6011719 4.3496094 6.7011719 C 4.3946094 6.5331719 4.533125 6.3946094 4.703125 6.3496094 C 5.508125 6.1336094 9.118 6 12 6 z M 10 8.5351562 L 10 15.464844 L 16 12 L 10 8.5351562 z"></path>
                  </svg>
                </a>
              </li>
              <li className="flex items-center h-6 space-x-2">
                <div>QA : 감보동 회원들</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
