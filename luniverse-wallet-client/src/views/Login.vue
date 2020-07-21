<template>
  <sui-container>
    <sui-grid>
      <sui-grid-column :width="8">
      </sui-grid-column>
      <sui-grid-column :width="8">
      </sui-grid-column>
    </sui-grid>
<!--    <div class="ui middle aligned center aligned grid">-->
<!--      <div class="column">-->
<!--        <h2 class="ui teal image header">-->
<!--          <img src="assets/images/logo.png" class="image">-->
<!--          <div class="content">-->
<!--            Log-in to your account-->
<!--          </div>-->
<!--        </h2>-->
<!--        <form class="ui large form">-->
<!--          <div class="ui stacked segment">-->
<!--            <div class="field">-->
<!--              <div class="ui left icon input">-->
<!--                <i class="user icon"></i>-->
<!--                <input type="text" name="email" placeholder="E-mail address">-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="field">-->
<!--              <div class="ui left icon input">-->
<!--                <i class="lock icon"></i>-->
<!--                <input type="password" name="password" placeholder="Password">-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="ui fluid large teal submit button">Login</div>-->
<!--          </div>-->

<!--          <div class="ui error message"></div>-->

<!--        </form>-->

<!--        <div class="ui message">-->
<!--          New to us? <a href="#">Sign Up</a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </sui-container>
</template>
<script>

</script>
<style lang="scss" scoped>
  .ui[class*="middle aligned"].grid > .column:not(.row), .ui[class*="middle aligned"].grid > .row > .column, .ui.grid > [class*="middle aligned"].row > .column, .ui.grid > [class*="middle aligned"].column:not(.row), .ui.grid > .row > [class*="middle aligned"].column {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    vertical-align: middle;
    -ms-flex-item-align: center !important;
    align-self: center !important;
  }
  body > .grid {
    height: 100%;
  }
</style>
