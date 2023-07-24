function BugList() {
  return (
    <div class="container">
    <div class="row">
        <div class="col-xl-12 mb-3 mb-lg-5">
            <div class="card">
                <div class="d-flex card-header justify-content-between">
                    <h5 class="me-3 mb-0">Top Bugs</h5>
                    <div class="dropdown show">
                      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                      </a>

                      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        
                        <li class="list-group-item pt-0">
                            <div class="d-flex align-items-center">
                                {/* <div class="flex-shrink-0 me-3">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar rounded-circle" />
                                </div> */}
                                <div class="flex-grow-1">
                                    <h6 class="mb-0">Bug 1</h6>
                                    <p class="mb-0 text-muted">Info</p>
                                </div>
                                <div class="flex-shrink-0 text-end">
                                    <span>
                                        More info
                                    </span>
                                </div>
                            </div>
                        </li>
                        
                        <li class="list-group-item">
                            <div class="d-flex align-items-center">
                                {/* <div class="flex-shrink-0 me-3">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="avatar rounded-circle" />
                                </div> */}
                                <div class="flex-grow-1">
                                    <h6 class="mb-0">Bug 2</h6>
                                    <p class="mb-0 text-muted">Info</p>
                                </div>
                                <div class="flex-shrink-0 text-end">
                                    <span>
                                        More Info
                                    </span>
                                </div>
                            </div>
                        </li>
                        
                        <li class="list-group-item">
                            <div class="d-flex align-items-center">
                                {/* <div class="flex-shrink-0 me-3">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="avatar rounded-circle" />
                                </div> */}
                                <div class="flex-grow-1">
                                    <h6 class="mb-0">Bug 3</h6>
                                    <p class="mb-0 text-muted">Info</p>
                                </div>
                                <div class="flex-shrink-0 text-end">
                                    <span>
                                        More Info
                                    </span>
                                </div>
                            </div>
                        </li>
                        
                        <li class="list-group-item">
                            <div class="d-flex align-items-center">
                                {/* <div class="flex-shrink-0 me-3">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" class="avatar rounded-circle" />
                                </div> */}
                                <div class="flex-grow-1">
                                    <h6 class="mb-0">Bug 4</h6>
                                    <p class="mb-0 text-muted">info</p>
                                </div>
                                <div class="flex-shrink-0 text-end">
                                    <span>
                                        More Info
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default BugList;