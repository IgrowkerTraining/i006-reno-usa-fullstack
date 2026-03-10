import { DonutChart } from "../pages/Report/DonutChart";


export const AiViewModal = () => {

    return (
        <>
            <button
                command="show-modal"
                commandfor="dialog"
                className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
            >
                AI Analysis
            </button>

            <el-dialog>
                <dialog
                    id="dialog"
                    aria-labelledby="dialog-title"
                    className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
                >
                    <el-dialog-backdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

                    <div
                        tabIndex="0"
                        className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
                    >
                        <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full m-10 data-closed:sm:translate-y-0 data-closed:sm:scale-95">

                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h1 id="dialog-title" className="text-3xl border-b-2 pb-2 border-blue-950 font-semibold text-gray-900">
                                    Project Analysis
                                </h1>

                                <div className="grid grid-cols-2 gap-8 m-8">
                                    <div className="col-span-1 bg-sky-100 p-6 rounded-md text-white ps-14">
                                        <DonutChart progress={3} />
                                    </div>
                                    <div className="col-span-1 bg-green-500">TASKS IN PROCESS</div>
                                </div>

                                <div className="grid grid-cols-3 gap-8 m-8">
                                    <div className="col-span-1 p-6 rounded-md bg-amber-300 justify-items-center text-white">
                                        <svg width="139" height="139" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M115.11 48.7722H85.2062L112.097 14.7959C112.653 14.0765 112.151 13.0312 111.242 13.0312H59.1845C58.8044 13.0312 58.4379 13.2349 58.2478 13.5742L23.077 74.3188C22.6562 75.0383 23.1721 75.9478 24.0137 75.9478H47.6871L35.5517 124.489C35.2938 125.548 36.5698 126.295 37.3571 125.534L115.857 50.6318C116.563 49.9667 116.088 48.7722 115.11 48.7722Z" fill="#EEEEEC" />
                                        </svg>
                                        <h3 className="text-xl font-semibold my-2">Safety Standards</h3>
                                        <p className="my-2">Two active incidence alert !</p>
                                        <p className="text-4xl font-bold">3%</p>

                                    </div>
                                    <div className="col-span-1 p-6 rounded-md bg-red-400 justify-items-center text-white">
                                        <svg width="149" height="149" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M139.061 124.555L78.53 19.7891C77.6279 18.2321 76.071 17.4609 74.4995 17.4609C72.928 17.4609 71.3565 18.2321 70.4689 19.7891L9.93766 124.555C8.14791 127.669 10.3887 131.539 13.9682 131.539L135.031 131.539C138.61 131.539 140.851 127.669 139.061 124.555ZM69.8432 60.5313C69.8432 59.891 70.367 59.3672 71.0073 59.3672L77.9917 59.3672C78.6319 59.3672 79.1557 59.891 79.1557 60.5313L79.1557 87.3047C79.1557 87.9449 78.6319 88.4688 77.9917 88.4688L71.0073 88.4688C70.367 88.4688 69.8432 87.9449 69.8432 87.3047L69.8432 60.5313ZM74.4995 111.75C72.6718 111.713 70.9315 110.96 69.6522 109.655C68.3728 108.349 67.6562 106.594 67.6562 104.766C67.6562 102.938 68.3728 101.182 69.6522 99.8766C70.9315 98.5708 72.6718 97.8186 74.4995 97.7813C76.3271 97.8186 78.0674 98.5708 79.3468 99.8766C80.6262 101.182 81.3427 102.938 81.3427 104.766C81.3427 106.594 80.6262 108.349 79.3468 109.655C78.0674 110.96 76.3271 111.713 74.4995 111.75Z" fill="white" />
                                        </svg>

                                        <h3 className="text-xl font-semibold my-2">Safety Standards</h3>
                                        <p className="my-2">Two active incidence alert !</p>
                                        <p className="text-4xl font-bold">3%</p>
                                    </div>
                                    <div className="col-span-1 p-6 rounded-md bg-blue-500 justify-items-center text-white">
                                        <svg width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M97.043 89.4346C94.3441 89.4346 92.1621 91.6166 92.1621 94.3154C92.1621 97.0143 94.3441 99.1963 97.043 99.1963C99.7418 99.1963 101.924 97.0143 101.924 94.3154C101.924 91.6166 99.7418 89.4346 97.043 89.4346ZM126.328 24.1172H95.8945C95.8945 19.6813 92.2913 16.0781 87.8555 16.0781H76.3711C71.9353 16.0781 68.332 19.6813 68.332 24.1172H37.8984C35.3575 24.1172 33.3047 26.17 33.3047 28.7109V57.4219H20.6719C18.131 57.4219 16.0781 59.4747 16.0781 62.0156V126.328C16.0781 128.869 18.131 130.922 20.6719 130.922H68.9062C71.4472 130.922 73.5 128.869 73.5 126.328V124.031H126.328C128.869 124.031 130.922 121.978 130.922 119.438V28.7109C130.922 26.17 128.869 24.1172 126.328 24.1172ZM64.3125 121.734H25.2656V88.4297H64.3125V121.734ZM64.3125 79.2422H25.2656V66.6094H64.3125V79.2422ZM67.1836 40.1953V33.3047H77.5195V25.2656H86.707V33.3047H97.043V40.1953H67.1836ZM93.0234 64.3125V72.3516C93.0234 72.9832 92.5066 73.5 91.875 73.5H84.9844C84.3527 73.5 83.8359 72.9832 83.8359 72.3516V64.3125C83.8359 63.6809 84.3527 63.1641 84.9844 63.1641H91.875C92.5066 63.1641 93.0234 63.6809 93.0234 64.3125ZM97.043 107.522C89.7504 107.522 83.8359 101.608 83.8359 94.3154C83.8359 87.0229 89.7504 81.1084 97.043 81.1084C104.336 81.1084 110.25 87.0229 110.25 94.3154C110.25 101.608 104.336 107.522 97.043 107.522ZM110.25 72.3516C110.25 72.9832 109.733 73.5 109.102 73.5H102.211C101.579 73.5 101.062 72.9832 101.062 72.3516V58.5703C101.062 57.9387 101.579 57.4219 102.211 57.4219H109.102C109.733 57.4219 110.25 57.9387 110.25 58.5703V72.3516ZM97.043 81.1084C89.7504 81.1084 83.8359 87.0229 83.8359 94.3154C83.8359 101.608 89.7504 107.522 97.043 107.522C104.336 107.522 110.25 101.608 110.25 94.3154C110.25 87.0229 104.336 81.1084 97.043 81.1084ZM97.043 99.1963C94.3441 99.1963 92.1621 97.0143 92.1621 94.3154C92.1621 91.6166 94.3441 89.4346 97.043 89.4346C99.7418 89.4346 101.924 91.6166 101.924 94.3154C101.924 97.0143 99.7418 99.1963 97.043 99.1963Z" fill="#EEEEEC" />
                                        </svg>
                                        <h3 className="text-xl font-semibold my-2">Safety Standards</h3>
                                        <p className="my-2">Two active incidence alert !</p>
                                        <p className="text-4xl font-bold">3%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    command="close"
                                    commandfor="dialog"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Deactivate
                                </button>

                                <button
                                    type="button"
                                    command="close"
                                    commandfor="dialog"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>

                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
        </>

    );
}