<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <!-- <CCard class="text-white py-5">
              <CCardBody class="text-center">
                <div>
                  <img
                    src="@/assets/brand/InkWell-Writers-Logo.png"
                    alt="InkWell Writers Logo"
                    width="180"
                  />
                </div>
              </CCardBody>
            </CCard> -->
            <CCard class="p-4 max-w-md mx-auto">
              <CCardBody>
                <div class="py-3">
                  <img
                    src="@/assets/brand/InkWell-Writers-Logo.png"
                    alt="InkWell Writers Logo"
                    width="180"
                  />
                </div>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useAuthStore } from "../../stores/auth.store";

onMounted(() => {
  auth.error = null;
});

/**Form variables */
const formData = reactive({
  email: "",
  password: "",
});

/**initialise the auth store */
const auth = useAuthStore();

/**Get error from auth store */
const error = computed(() => {
  return auth.error;
});

const validations = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(3) },
  };
});

/**initialise form validation */
const v$ = useVuelidate(validations, formData);

/**Close Login Modal */
const closeModal = () => {
  auth.isLoginModalOpen = false;
};

/**Submit form */
const handleSubmit = async () => {
  const result = await v$.value.$validate();
  console.log(formData);
  if (result) {
    console.log("Form submitted");
    return auth.login(formData);
  } else {
    console.log("Form not submitted");
  }
};
</script>
